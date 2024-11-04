<template>
  <NavBar />
  <div :class="['dashboard', darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800', 'min-h-screen', 'p-8', 'pt-24']">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-4xl font-bold text-center">Nemea Dashboard [WIP]</h1>
      <!-- <button @click="toggleDarkMode" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
        {{ darkMode ? 'Light Mode' : 'Dark Mode' }}
      </button> -->
    </div>

    <div v-if="monitors.length === 0" class="mt-8 text-center">
      <p class="text-lg">{{ darkMode ? 'Loading monitors...' : 'Loading monitors...' }}</p>
    </div>

    <div class="charts grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="monitor in monitors"
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
        <h3 class="text-2xl font-semibold">
          <span :class="['status-dot', getStatusClass(monitor), 'inline-block', 'w-2.5', 'h-2.5', 'rounded-full', 'animate-pulse']"></span>
          {{ monitor.host }}
        </h3>
        <p class="text-sm mb-4">
          Monitor ID: <span class="font-medium">{{ monitor.id }}</span>
        </p>
        <apexcharts
          ref="charts"
          :id="`ping-chart-${monitor.id}`"
          width="100%"
          height="300"
          type="line"
          :options="getChartOptions(monitor.host)"
          :series="monitor.series"
          class="flex-grow"
        />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';
import axios from 'axios';
import { format, subMinutes, parseISO, isAfter } from 'date-fns';
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'PingCharts',
  components: {
    apexcharts: VueApexCharts,
    NavBar: NavBar,
    Footer: Footer
  },
  data() {
    return {
      monitors: [],
      darkMode: false,
      responsePollingInterval: null, // Track the polling interval for response times
      monitorPollingInterval: null // Track the polling interval for new monitors
    };
  },
  mounted() {
    this.loadDarkModePreference();
    this.initializeMonitors();
    this.startPollingAllMonitors();
    this.startPollingNewMonitors();
  },
  beforeUnmount() {
    if (this.responsePollingInterval) {
      clearInterval(this.responsePollingInterval);
    }
    if (this.monitorPollingInterval) {
      clearInterval(this.monitorPollingInterval);
    }
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('darkMode', this.darkMode);
    },
    loadDarkModePreference() {
      const savedDarkMode = localStorage.getItem('darkMode');
      this.darkMode = savedDarkMode === 'true';
    },
    // Initialize all monitors of type "PING"
    async initializeMonitors() {
      try {
        const response = await axios.get('http://127.0.0.1:3000/v1/nemea/monitors');
        const pingMonitors = response.data.monitors.filter((monitor) => monitor.type === 'PING');

        this.monitors = pingMonitors.map((monitor) => ({
          id: monitor.id,
          host: monitor.host,
          series: [], // Initial empty series, will be populated by loadResponseTimes
          latestTimestamp: null // Track the latest response timestamp
        }));

        // Load initial data for each monitor
        this.loadAllResponseTimes();
      } catch (error) {
        console.error('Error initializing monitors:', error);
      }
    },
    // Load response times for all monitors
    async loadAllResponseTimes() {
      try {
        const monitorPromises = this.monitors.map(async (monitor) => {
          const response = await axios.get(`http://127.0.0.1:3000/v1/nemea/monitors/${monitor.id}/rt`);
          const responseData = response.data.response_times;

          // Convert responseData object to an array
          const responseArray = Object.values(responseData);

          // Map response data to create series by location
          const seriesMap = responseArray.reduce((acc, data) => {
            const location = `${data.measurement_loc.city}, ${data.measurement_loc.region} [${data.measurement_loc.org}]`;
            if (!acc[location]) {
              acc[location] = [];
            }
            // Format the created_at date
            const formattedDate = format(new Date(data.created_at), 'MMM dd, yyyy HH:mm:ss');
            acc[location].unshift({
              x: formattedDate,
              y: data.avg
            });
            return acc;
          }, {});

          // Create series array for update
          const newSeries = Object.keys(seriesMap).map((location) => ({
            name: location,
            data: seriesMap[location]
          }));

          // Track the latest response timestamp
          if (responseArray.length > 0) {
            monitor.latestTimestamp = responseArray[0].created_at;
          }

          // Update monitor's series data
          monitor.series = newSeries;

          // Update the series for this monitor using the chart reference
          const chartRef = this.$refs.charts.find((chart) => chart.$el.id === `ping-chart-${monitor.id}`);
          if (chartRef) {
            chartRef.updateSeries(newSeries);
          }
        });

        // Wait for all monitor data to be loaded
        await Promise.all(monitorPromises);
      } catch (error) {
        console.error('Error loading response times:', error);
      }
    },
    // Start polling response times for all monitors every minute
    startPollingAllMonitors() {
      this.responsePollingInterval = setInterval(() => {
        this.loadAllResponseTimes();
      }, 10000); // Poll every minute
    },
    // Start polling for new monitors every minute
    startPollingNewMonitors() {
      this.monitorPollingInterval = setInterval(async () => {
        try {
          const response = await axios.get('http://127.0.0.1:3000/v1/nemea/monitors');
          const pingMonitors = response.data.monitors.filter((monitor) => monitor.type === 'PING');

          // Check for new monitors
          const newMonitors = pingMonitors.filter((pingMonitor) => !this.monitors.some((monitor) => monitor.id === pingMonitor.id));

          if (newMonitors.length > 0) {
            // Add new monitors to the list
            newMonitors.forEach((newMonitor) => {
              this.monitors.push({
                id: newMonitor.id,
                host: newMonitor.host,
                series: [],
                latestTimestamp: null
              });
            });
            // Load response times for new monitors
            this.loadAllResponseTimes();
          }
        } catch (error) {
          console.error('Error polling new monitors:', error);
        }
      }, 60000); // Poll every minute
    },
    // Chart options for each monitor
    getChartOptions(host) {
      return {
        chart: {
          id: `ping-chart-${host}`,
          type: 'area',
          animations: {
            enabled: true,
            easing: 'linear',
            speed: 900,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 150
            }
          }
        },
        fill: {
          type: 'gradient',
          shade: 'dark',
          gradient: {
            type: 'vertical',
            shadeIntensity: 1,
            opacityFrom: 0.2,
            opacityTo: 0.4,
            stops: [0, 30, 50, 80, 100]
          }
        },
        dataLabels: {
          enabled: false
        },
        tooltip: {
          enabled: true,
          x: {
            show: false
          },
          y: {
            formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
              return value;
            }
          }
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          position: 'bottom',
          horizontalAlign: 'center',
          floating: false,
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial',
          onItemClick: {
            toggleDataSeries: true
          },
          onItemHover: {
            highlightDataSeries: true
          }
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        grid: {
          show: true,
          xaxis: {
            lines: {
              show: false
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          }
        },
        markers: {
          size: 0
        },
        xaxis: {
          type: 'category',
          tickPlacement: 'on',
          tickAmount: 'dataPoints',
          labels: {
            show: false,
            hideOverlappingLabels: true,
            rotate: -45,
            rotateAlways: true,
            style: {
              fontSize: '10px', // Adjusted font size
              colors: this.darkMode ? ['#fff'] : ['#000']
            }
          },
          axisTicks: {
            show: false
          }
        },

        noData: {
          text: "Nemea Agent Hasn't Sent Data Yet"
        },
        theme: {
          palette: 'palette8'
        }
      };
    },
    getStatusClass(monitor) {
      if (!monitor.latestTimestamp) return 'offline';
      const latestTime = parseISO(monitor.latestTimestamp);
      const fiveMinutesAgo = subMinutes(new Date(), 5);
      return isAfter(latestTime, fiveMinutesAgo) ? 'online' : 'offline';
    }
  }
};
</script>

<style scoped>
.chart-container {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  height: 400px; /* Adjust height as needed */
  padding-bottom: 20px;
}

.chart-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.online {
  @apply bg-green-700 shadow-green-500;
}
.offline {
  @apply bg-red-700 shadow-red-500;
}
.status-dot {
  /* margin-bottom: 2px; */
  margin: 2px;
}
</style>
