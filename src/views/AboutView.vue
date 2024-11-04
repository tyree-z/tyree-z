<template>
  <NavBar />
  <div :class="['dashboard', darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800', 'min-h-screen', 'p-8', 'pt-24']">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-4xl font-bold text-center">Nemea Monitoring Dashboard</h1>
      <button @click="toggleDarkMode" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
        {{ darkMode ? 'Light Mode' : 'Dark Mode' }}
      </button>
    </div>

    <div class="charts grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="monitor in pingMonitors"
        :key="monitor.id"
        :class="[
          'chart-container',
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
          'rounded-lg',
          'shadow-lg',
          'p-4',
          'flex',
          'flex-col'
        ]"
      >
        <h3 class="text-2xl font-semibold">{{ monitor.host }}</h3>
        <p class="text-sm mb-4">
          Monitor ID: <span class="font-medium">{{ monitor.id }}</span>
        </p>

        <LineChart :chartData="getChartData(monitor)" :options="chartOptions" class="chart flex-grow" style="height: 300px; width: 100%" />
      </div>
    </div>

    <div v-if="pingMonitors.length === 0" class="mt-8 text-center">
      <p class="text-lg">{{ darkMode ? 'Loading monitors...' : 'Loading monitors...' }}</p>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import { LineChart } from 'vue-chart-3';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, LineController } from 'chart.js';
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
import { marker } from 'leaflet';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, LineController);

const monitors = ref([]);
const pingMonitors = ref([]);
let fetchMonitorsInterval = null;
let fetchResponseTimesInterval = null;
let isFetchingMonitors = false;

// Dark mode state
const darkMode = ref(false);

// Toggle dark mode function
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  localStorage.setItem('darkMode', darkMode.value);
};

// Load initial dark mode setting from localStorage
onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode');
  darkMode.value = savedDarkMode === 'true';
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 500
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Response Time (ms)',
        color: darkMode.value ? '#ddd' : '#555',
        font: { size: 14 }
      }
    },
    x: {
      title: {
        display: true,
        text: 'Time',
        color: darkMode.value ? '#ddd' : '#555',
        font: { size: 14 }
      },
      reverse: true
    }
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function (context) {
          const location = context.dataset.label;
          const value = context.raw;
          return `${location}: ${value} ms`;
        }
      }
    }
  }
};

// Fetch monitors from API
const fetchMonitors = async () => {
  if (isFetchingMonitors) return;
  isFetchingMonitors = true;

  try {
    console.log('Fetching Monitors');
    const response = await axios.get('https://api-dev.tyree.ca/v1/nemea/monitors');
    monitors.value = response.data.monitors;
    pingMonitors.value = monitors.value.filter((monitor) => monitor.type === 'PING');

    // Initialize responseTimes from localStorage
    pingMonitors.value.forEach((monitor) => {
      const storedData = JSON.parse(localStorage.getItem(`responseTimes_${monitor.id}`)) || [];
      monitor.responseTimes = storedData;
    });
  } catch (error) {
    console.error('Error fetching monitors:', error);
  } finally {
    isFetchingMonitors = false;
  }
};

const fetchResponseTimes = async (monitorId) => {
  try {
    const response = await axios.get(`https://api-dev.tyree.ca/v1/nemea/monitors/${monitorId}/rt`);
    const responseData = response.data.response_times;

    console.log(`Fetched response times for monitor ${monitorId}`);

    const monitor = pingMonitors.value.find((monitor) => monitor.id === monitorId);
    if (monitor && typeof responseData === 'object') {
      // Retrieve stored response times from localStorage
      let storedData = JSON.parse(localStorage.getItem(`responseTimes_${monitor.id}`)) || [];

      // Process each entry in response_times
      Object.keys(responseData).forEach((key) => {
        const newResponseTime = responseData[key];

        // Ensure all expected fields are present before pushing to monitor's response times
        if (
          newResponseTime &&
          newResponseTime.min !== undefined &&
          newResponseTime.max !== undefined &&
          newResponseTime.avg !== undefined &&
          newResponseTime.packet_loss !== undefined &&
          newResponseTime.created_at &&
          newResponseTime.measurement_loc
        ) {
          // Check if the response time entry already exists to avoid duplicates
          const isDuplicate = storedData.some((existing) => existing.created_at === newResponseTime.created_at);

          if (!isDuplicate) {
            // If stored data has reached 100 entries, remove the oldest one
            if (storedData.length >= 250) {
              storedData.shift();
            }
            // Add the new response time
            storedData.push({
              ...newResponseTime,
              created_at: newResponseTime.created_at
            });
          }
        }
      });

      // Sort response times by created_at in descending order
      storedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      // Update localStorage with the new response times
      localStorage.setItem(`responseTimes_${monitor.id}`, JSON.stringify(storedData));

      // Update the monitor's responseTimes with the updated data
      monitor.responseTimes = storedData;
    } else {
      console.error(`No valid monitor found for ID: ${monitorId} or response data is not an object.`);
    }
  } catch (error) {
    console.error(`Error fetching response times for monitor ${monitorId}:`, error);
  }
};

// Fetch monitors and response times on mount
onMounted(() => {
  fetchMonitors();

  // Set interval to fetch monitors every 10 seconds
  fetchMonitorsInterval = setInterval(fetchMonitors, 10000); // Refresh monitors every 10 seconds

  // Set interval to fetch response times every 10 seconds if there are monitors available
  fetchResponseTimesInterval = setInterval(() => {
    pingMonitors.value.forEach((monitor) => {
      fetchResponseTimes(monitor.id);
    });
  }, 10000);
});

// Clear intervals on component unmount
onBeforeUnmount(() => {
  if (fetchMonitorsInterval) {
    clearInterval(fetchMonitorsInterval);
  }

  if (fetchResponseTimesInterval) {
    clearInterval(fetchResponseTimesInterval);
  }
});

// Get chart data for the monitor
const getChartData = (monitor) => {
  // Create a map to group response times by location
  const locationDataMap = {};
  monitor.responseTimes.forEach((data) => {
    const locationKey = `${data.measurement_loc.city || 'N/A'}, ${data.measurement_loc.region || 'N/A'}, ${data.measurement_loc.country || 'N/A'}`;

    if (!locationDataMap[locationKey]) {
      locationDataMap[locationKey] = [];
    }
    locationDataMap[locationKey].push(data);
  });

  // Assign different colors to each location
  const colors = ['#FF5722', '#4CAF50', '#2196F3', '#FFC107', '#9C27B0', '#00BCD4', '#795548', '#E91E63', '#673AB7', '#3F51B5'];

  const labels = monitor.responseTimes.map((data) => new Date(data.created_at).toLocaleTimeString());

  // Create datasets for each location
  const datasets = Object.keys(locationDataMap).map((location, index) => {
    const locationResponseTimes = locationDataMap[location];
    return {
      label: `${location}`,
      data: locationResponseTimes.map((data) => data.avg),
      borderColor: colors[index % colors.length], // Assign a color from the list
      backgroundColor: `${colors[index % colors.length]}33`, // Use a semi-transparent version of the color for the background
      tension: 0.6,
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      }, // Optionally, make lines instead of areas for more clarity
      markers: {
        size: 0
      }
    };
  });

  return {
    labels,
    datasets
  };
};

// Get response times by location
const getLocationData = (monitor) => {
  const locations = {};

  monitor.responseTimes.forEach((data) => {
    const locationKey = `${data.measurement_loc.city || 'N/A'}, ${data.measurement_loc.region || 'N/A'}, ${data.measurement_loc.country || 'N/A'}`;

    if (!locations[locationKey]) {
      locations[locationKey] = [];
    }
    locations[locationKey].push(data);
  });

  return locations;
};
</script>

<style scoped>
.chart {
  height: 300px;
}

.chart-container {
  border: 1px solid;
}

.dashboard {
  font-family: Arial, sans-serif;
}

.chart-container {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  height: 500px; /* Adjust height if needed */
}

.chart-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
</style>
