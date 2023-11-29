<template>
  <main class="min-h-screen bg-base-100">
    <div class="mx-auto max-w-7xl py-20 px-6 lg:py-24">
      <div class="py-6">
        <div class="flex flex-wrap -mx-2 items-center">
          <div class="px-2 w-full">
            <div class="text-sm font-medium text-gray-500">Resume</div>
            <h2 class="text-2xl font-semibold text-base-content">Tyree Zacharopoulos</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-grow">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex flex-wrap -mx-2">
          <div class="px-2 w-full sm:w-1/2 lg:w-1/5">
            <div class="bg-neutral shadow rounded-lg p-4">
              <div class="flex items-center mb-2">
                <div class="text-sm font-semibold">Contact</div>
              </div>
              <div class="mb-1">
                <a href="tel:+17785319012" class="text-blue-600 hover:text-blue-800 font-mono">
                  <i class="ti ti-phone-call text-lg"></i> +1(778)531 9012
                </a>
              </div>
              <div class="mb-1">
                <a href="mailto:tyree@tyree.ca" class="text-blue-600 hover:text-blue-800 font-mono">
                  <i class="ti ti-mail text-lg"></i> tyree@tyree.ca
                </a>
              </div>
              <div class="mb-1">
                <a href="https://tyree.ca" class="text-blue-600 hover:text-blue-800 font-mono">
                  <i class="ti ti-world text-lg"></i> tyree.ca
                </a>
              </div>
            </div>
          </div>
          <!-- Additional columns can be added here -->
          <div class="px-2 w-full lg:w-1/2">
            <div class="bg-neutral shadow rounded-lg">
              <div class="p-4">
                <h3 class="text-lg font-semibold">Professional Experience</h3>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-base-300">
                  <thead class="bg-bg-neutral">
                    <tr>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Company
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Position
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Duration
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Location
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-neutral divide-y divide-base-300">
                    <tr v-for="job in jobs" :key="job.id">
                      <td class="px-6 py-4 whitespace-nowrap">{{ job.company }}</td>
                      <td class="px-6 py-4 whitespace-nowrap">{{ job.position }}</td>
                      <td class="px-6 py-4 whitespace-nowrap">{{ job.duration }}</td>
                      <td class="px-6 py-4 whitespace-nowrap">{{ job.location }}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <button
                          @click="openModal(job.id)"
                          type="button"
                          class="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg text-sm px-3 py-1"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <dialog
                v-for="job in jobs"
                :key="job.id"
                :id="job.id"
                class="relative z-10"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
              >
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div class="fixed z-10 inset-0 overflow-y-auto">
                  <div
                    class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0"
                  >
                    <div
                      class="relative bg-neutral rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full"
                    >
                      <div class="bg-neutral px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3
                              class="text-lg leading-6 font-medium text-base-content"
                              id="modal-title"
                            >
                              {{ job.company }}
                            </h3>
                            <div class="mt-2">
                              <p class="text-sm text-base-content">{{ job.modalContent }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="bg-neutral px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          @click="closeModal(job.id)"
                          type="button"
                          class="mt-3 w-full inline-flex justify-center rounded-md border border-base-200 shadow-sm px-4 py-2 bg-neutral text-base font-medium text-base-content hover:bg-base-100 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      jobs: [
        {
          id: 'theos',
          company: 'Theos Restaurant',
          position: 'Dishwasher',
          duration: '2017 – 2019',
          location: 'Penticton, BC',
          modalContent: 'Details about my work at Theos Restaurant...'
        },
        {
          id: 'apps',
          company: 'Apex Premier Property Services',
          position: 'Landscaping',
          duration: '2019 – 2020',
          location: 'Penticton, BC',
          modalContent: 'Details about my work at Apex Premier Property Services...'
        },
        {
          id: 'jrmill',
          company: 'J&R Millwork Ltd',
          position: 'Manufacturing',
          duration: '2020 – 2021',
          location: 'West Kelowna, BC',
          modalContent: 'Details about my work at J&R Millwork Ltd...'
        },
        {
          id: 'qualitymovers',
          company: 'Quality Movers',
          position: 'Labourer',
          duration: '2020 – 2021',
          location: 'Summerland, BC',
          modalContent: 'Details about my work at Quality Movers...'
        },
        {
          id: 'neighbourhoodbrew',
          company: 'Neighbourhood Brewing Company',
          position: 'Kitchen Helper',
          duration: '2021 – Current',
          location: 'Penticton, BC',
          modalContent: 'Details about my work at Neighbourhood Brewing Company...'
        }
      ]
    }
  },
  methods: {
    openModal(jobId) {
      const modal = document.getElementById(jobId)
      if (modal) {
        modal.showModal()
      }
    },
    closeModal(jobId) {
      const modal = document.getElementById(jobId)
      if (modal) {
        modal.close()
      }
    }
  }
}
</script>
