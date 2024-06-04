<template>
  <NavBar />
  <main class="min-h-screen bg-base-100">
    <div class="container mx-auto max-w-9xl py-12 px-4 lg:py-20">
      <div class="text-center mb-10 p-5">
        <div class="text-sm font-medium text-gray-500">Resume</div>
        <h1 class="text-3xl font-bold text-base-content mt-2">Tyree Zacharopoulos</h1>
      </div>

      <section class="mb-10">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="bg-neutral shadow rounded-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Contact</h3>
            <ul>
              <li class="mb-2">
                <a href="tel:+17785319012" class="text-blue-500 hover:text-blue-700 flex items-center">
                  <i class="ti ti-phone-call text-lg mr-2"></i>+1 (778) 531 9012
                </a>
              </li>
              <li class="mb-2">
                <a href="mailto:tyree@tyree.ca" class="text-blue-500 hover:text-blue-700 flex items-center">
                  <i class="ti ti-mail text-lg mr-2"></i>tyree@tyree.ca
                </a>
              </li>
              <li>
                <a href="https://tyree.ca" class="text-blue-500 hover:text-blue-700 flex items-center">
                  <i class="ti ti-world text-lg mr-2"></i>tyree.ca
                </a>
              </li>
            </ul>
          </div>

          <div class="lg:col-span-2">
            <div class="bg-neutral shadow rounded-lg overflow-hidden">
              <div class="p-6">
                <h3 class="text-lg font-semibold">Professional Experience</h3>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-base-300">
                  <thead class="bg-base-100">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                      <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Position</th>
                      <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</th>
                      <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                      <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</th>
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
                          @click="openModal(job)"
                          type="button"
                          class="inline-flex items-center justify-center rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 text-sm transition duration-150 ease-in-out"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Modal Dialogs -->
    <dialog
      v-for="job in jobs"
      :key="job.id"
      :id="job.id"
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      @click.self="closeModal(job)"
    >
      <div class="fixed inset-0 bg-base-300 bg-opacity-80 transition-opacity"></div>
      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div class="max-w-3xl relative bg-neutral rounded-xl text-left overflow-hidden shadow-xl transform transition-all">
            <div class="bg-neutral px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-5 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h1 class="text-xl font-medium text-primary" id="modal-title">
                    {{ job.company }}
                  </h1>
                  <p class="text-xs text-base-content">{{ job.location }}</p>
                  <div class="mt-1">
                    <p class="text-sm text-base-content font-semibold">
                      {{ job.modalContent.company_subtext }}
                    </p>
                  </div>
                  <div class="mt-5">
                    <h4 class="text-accent font-semibold mb-1">Description</h4>
                    <p class="text-sm text-base-content">{{ job.modalContent.description }}</p>
                  </div>
                  <div class="mt-5">
                    <h4 class="text-accent font-semibold mb-1">Skills</h4>
                    <ul class="list-disc list-inside text-sm">
                      <li v-for="skill in job.modalContent.skills" :key="skill" class="text-base-content">
                        {{ skill }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-neutral px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                @click="closeModal(job)"
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-base-200 text-base font-medium text-base-content hover:bg-base-100 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  </main>
</template>

<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar
  },
  data() {
    return {
      jobs: []
    };
  },
  mounted() {
    axios
      .get('https://api.tyree.ca/v1/website/cv/data')
      .then((response) => {
        this.jobs = response.data.jobs;
      })
      .catch((error) => {
        console.error('Error fetching resume data:', error);
      });
  },
  methods: {
    openModal(job) {
      const modal = document.getElementById(job.id);
      if (modal) {
        modal.showModal();
      }
    },
    closeModal(job) {
      const modal = document.getElementById(job.id);
      if (modal) {
        modal.close();
      }
    }
  }
};
</script>
