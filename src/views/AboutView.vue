<template>
  <div class="bg-gray-100 p-4">
    <h1 class="text-2xl font-semibold mb-4">Combined Data</h1>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead class="bg-gray-800 text-white">
          <tr>
            <th class="py-3 px-4">ID</th>
            <th class="py-3 px-4">Type</th>
            <th class="py-3 px-4">State</th>
            <th class="py-3 px-4">SSID</th>
            <th class="py-3 px-4">Frequency (MHz)</th>
            <th class="py-3 px-4">Signal (dBm)</th>
            <th class="py-3 px-4">Device Name</th>
            <th class="py-3 px-4">Device Model</th>
            <th class="py-3 px-4">Device Category</th>
            <th class="py-3 px-4">Role</th>
            <th class="py-3 px-4">Authorized</th>
            <th class="py-3 px-4">Device Description</th>
            <th class="py-3 px-4">Device Status</th>
            <th class="py-3 px-4">Device RX Rate (Mbps)</th>
            <th class="py-3 px-4">Device TX Rate (Mbps)</th>
            <th class="py-3 px-4">Site Name</th>
            <th class="py-3 px-4">Site Type</th>
            <th class="py-3 px-4">Site Address</th>
            <th class="py-3 px-4">Site Device Count</th>
            <th class="py-3 px-4">Site Device Outage Count</th>
            <th class="py-3 px-4">Site Device List Status</th>
            <th class="py-3 px-4">Site Regulatory Domain</th>
            <th class="py-3 px-4">Site SLA</th>
            <!-- Add more table headers as needed -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="combinedData in combinedDataList" :key="combinedData.id">
            <td class="py-2 px-4">{{ combinedData.id }}</td>
            <td class="py-2 px-4">{{ combinedData.type }}</td>
            <td class="py-2 px-4">{{ combinedData.state }}</td>
            <td class="py-2 px-4">{{ combinedData.ssid || '-' }}</td>
            <td class="py-2 px-4">{{ combinedData.frequency || '-' }}</td>
            <td class="py-2 px-4">{{ combinedData.signal || '-' }}</td>
            <td class="py-2 px-4">{{ combinedData.to.device.displayName || '-' }}</td>
            <td class="py-2 px-4">{{ combinedData.to.device.model || '-' }}</td>
            <td class="py-2 px-4">{{ combinedData.to.device.category || '-' }}</td>
            <td class="py-2 px-4">{{ combinedData.to.device.role || '-' }}</td>
            <td class="py-2 px-4">{{ combinedData.to.device.authorized ? 'Yes' : 'No' }}</td>
            <td class="py-2 px-4">{{ combinedData.to.interface.description || '-' }}</td>
            <td class="py-2 px-4">{{ combinedData.to.device.status || '-' }}</td>
            <td class="py-2 px-4">{{ combinedData.to.interface.statistics.rxRate || '-' }}</td>
            <td class="py-2 px-4">{{ combinedData.to.interface.statistics.txRate || '-' }}</td>
            <td class="py-2 px-4">{{ combinedData.siteName || '-' }}</td>
            <td class="py-2 px-4">{{ combinedData.siteType || '-' }}</td>
            <td class="py-2 px-4">{{ combinedData.siteAddress || '-' }}</td>
            <td class="py-2 px-4">{{ combinedData.siteDeviceCount || '-' }}</td>
            <td class="py-2 px-4">{{ combinedData.siteDeviceOutageCount || '-' }}</td>
            <td class="py-2 px-4">{{ combinedData.siteDeviceListStatus || '-' }}</td>
            <td class="py-2 px-4">{{ combinedData.siteRegulatoryDomain || '-' }}</td>
            <td class="py-2 px-4">{{ combinedData.siteSLA || '-' }}</td>
            <!-- Add more table data cells as needed -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      dataLinks: [],
      siteData: [],
      combinedDataList: [],
    };
  },
  mounted() {
    this.fetchDataLinks();
    this.fetchSiteData();
  },
  methods: {
    fetchDataLinks() {
      // Make the API request for data links using Axios
      axios
        .get('https://isp.tyree.ca/nms/api/v2.1/data-links?siteLinksOnly=false', {
          headers: {
            'accept': 'application/json',
            'x-auth-token': '96af7eb1-025d-44c5-97f3-d73ae5a8d865',
          },
        })
        .then((response) => {
          this.dataLinks = response.data;
          this.combineData();
        })
        .catch((error) => {
          console.error('Error fetching data links:', error);
        });
    },
    fetchSiteData() {
      // Make the API request for site data using Axios
      axios
        .get('https://isp.tyree.ca/nms/api/v2.1/sites', {
          headers: {
            'accept': 'application/json',
            'x-auth-token': '96af7eb1-025d-44c5-97f3-d73ae5a8d865',
          },
        })
        .then((response) => {
          this.siteData = response.data;
          this.combineData();
        })
        .catch((error) => {
          console.error('Error fetching site data:', error);
        });
    },
    combineData() {
      // Combine the data from dataLinks and siteData based on matching IDs or any other criteria
      // You can implement this logic based on your specific requirements
      // For example, you can use nested loops to find matching data and create a combinedDataList.
      // Here, we assume a simple example where data with matching IDs are combined.

      // Clear the combined data list before merging
      this.combinedDataList = [];

      // Merge the data based on IDs
      for (const dataLink of this.dataLinks) {
        const matchingSiteData = this.siteData.find((site) => site.id === dataLink.to.device.id);
        if (matchingSiteData) {
          this.combinedDataList.push({
            ...dataLink,
            siteName: matchingSiteData.identification.name,
            siteType: matchingSiteData.identification.type,
            siteAddress: matchingSiteData.description.address,
            siteDeviceCount: matchingSiteData.description.deviceCount,
            siteDeviceOutageCount: matchingSiteData.description.deviceOutageCount,
            siteDeviceListStatus: matchingSiteData.description.deviceListStatus,
            siteRegulatoryDomain: matchingSiteData.description.regulatoryDomain,
            siteSLA: matchingSiteData.description.sla,
          });
        }
      }
    },
  },
};
</script>

<style scoped>
/* Add Tailwind CSS classes here for enhanced styling */
</style>
