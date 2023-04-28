<template>
  <div class="page-wrapper">
    <div class="container-xl">
      <div class="page-header d-print-none">
        <div class="row g-2 align-items-center">
          <div class="col">
            <div class="page-pretitle">Scheduling</div>
            <h2 class="page-title">Whos Working Today</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container-xl">
        <div class="card">
          <div class="card-body">
            <WorkingTodayTable :employees="employees" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Fetch from api

import WorkingTodayTable from '../../../components/Content/Tables/WorkingTodayTable.vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { ref, onMounted } from 'vue'

const { getAccessTokenSilently } = useAuth0()
const employees = ref([])
const fetchEmployees = async () => {
  const accessToken = await getAccessTokenSilently()
  const response = await fetch('https://api.dev.tyree.ca/v1/pushops/wwt', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then((response) => {
    if (response.status === 401) {
      console.log('unauthorized')
    }
    return response
  })

  employees.value = await response.json()
}

onMounted(() => {
  fetchEmployees()
})
</script>
