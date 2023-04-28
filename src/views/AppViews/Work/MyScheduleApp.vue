<template>
  <div class="page-wrapper">
    <div class="container-xl">
      <div class="page-header d-print-none">
        <div class="row g-2 align-items-center">
          <div class="col">
            <div class="page-pretitle">Scheduling</div>
            <h2 class="page-title">My Schedule</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container-xl">
        <div class="card">
          <div class="card-body">
            <MyScheduleTableVue :shifts="shifts" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Fetch from api

import { ref, onMounted } from 'vue'
import MyScheduleTableVue from '../../../components/Content/Tables/MyScheduleTable.vue'
import { useAuth0 } from '@auth0/auth0-vue'

// send post request to api

const { getAccessTokenSilently } = useAuth0()
const shifts = ref([])
const fetchSchedules = async () => {
  const accessToken = await getAccessTokenSilently()
  const response = await fetch('https://api.dev.tyree.ca/v1/pushops/schedule', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then((response) => {
    if (response.status === 401) {
      console.log('unauthorized')
    }
    return response
  })

  shifts.value = await response.json()
}

onMounted(() => {
  fetchSchedules()
})
</script>
