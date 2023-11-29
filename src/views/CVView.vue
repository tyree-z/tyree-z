<template>
  <NavBar />
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

  <!-- <body>
    <main class="min-h-screen bg-white text-gray-800">
      <div class="mx-auto max-w-7xl py-20 px-6 lg:py-24">
        <div class="relative">
          <h1>Jonathan Leawis</h1>

          <div class="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-4 xl:gap-24">
            <h2>Professional Title</h2>

            <div class="grid-3 xl:grid-3 mt-5 gap-4 border-t-2 border-gray-300 pt-4 lg:col-span-3 lg:flex lg:justify-between">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 shrink-0">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path>
                </svg>

                <div class="ml-3">
                  <p class="mb-0 text-sm font-semibold">Email</p>
                  <p class="mb-0">
                    <a href="mailto:support@resumewind.com" target="_blank" rel="noreferrer">
                      support@resumewind.com
                    </a>
                  </p>
                </div>
              </div>

              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 shrink-0">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"></path>
                </svg>

                <div class="ml-3">
                  <p class="mb-0 text-sm font-semibold">GitHub</p>
                  <p class="mb-0">
                    <a href="https://github.com/username" target="_blank" rel="noreferrer">
                      github.com/username
                    </a>
                  </p>
                </div>
              </div>

              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 shrink-0">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l .13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"></path>
                </svg>

                <div class="ml-3">
                  <p class="mb-0 text-sm font-semibold">Website</p>
                  <p class="mb-0">
                    <a href="https://resumewind.com" target="_blank" rel="noreferrer">
                      resumewind.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="absolute top-[-3rem] -left-12 h-40 w-40 rounded-full bg-teal-400 lg:top-[-3.5rem] lg:h-[13rem] lg:w-[13rem]"></div>
        </div>

        <div class="grid-3 mt-12 items-start gap-10 lg:mt-24 lg:gap-24">
          <div class="lg:col-span-2">
            <h3>Work Experience</h3>

            <div class="grid-3 gap-x-6">
              <div>
                <h4 class="mb-1 lg:mb-4">Company Name 1</h4>
                <p class="mb-1 text-sm">
                  <a href="https://resumewind.com/" target="_blank" rel="noreferrer">
                    companywebsite.com
                  </a>
                </p>
                <p class="text-sm">Sept. 2021 - Present</p>
              </div>

              <div class="lg:col-span-2">
                <h4 class="mb-4">Job Title 1</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer a imperdiet urna. Praesent eu posuere magna, in
                  suscipit quam. Here is an example of an
                  <a href="https://resumewind.com/" target="_blank" rel="noreferrer">external link</a>.
                </p>
                <p>
                  Mauris ullamcorper neque in ultrices mollis. Sed justo eros,
                  mollis sed odio id, finibus gravida enim. Aenean pharetra ante
                  elit, sit amet accumsan felis suscipit vitae. Vestibulum ante
                  ipsum primis.
                </p>
                <ul>
                  <li>Cras in erat bibendum, rhoncus nisl ac, luctus tortor</li>
                  <li>Vivamus volutpat nunc non quam dapibus</li>
                  <li>Nulla molestie odio odio, ut congue dui</li>
                </ul>
              </div>
            </div>

            <div class="grid-3 mt-8 gap-x-6 lg:mt-12">
              <div>
                <h4 class="mb-1 lg:mb-4">Company Name 2</h4>
                <p class="mb-1 text-sm">
                  <a href="https://resumewind.com/" target="_blank" rel="noreferrer">
                    companywebsite.com
                  </a>
                </p>
                <p class="text-sm">Oct. 2019 - Sept. 2021</p>
              </div>

              <div class="lg:col-span-2">
                <h4 class="mb-4">Job Title 2</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer a imperdiet urna. Praesent eu posuere magna, in
                  suscipit quam. Here is an example of an
                  <a href="https://resumewind.com/" target="_blank" rel="noreferrer">external link</a>.
                </p>
                <p>
                  Mauris ullamcorper neque in ultrices mollis. Sed justo eros,
                  mollis sed odio id, finibus gravida enim. Aenean pharetra ante
                  elit, sit amet accumsan felis suscipit vitae. Vestibulum ante
                  ipsum primis.
                </p>
                <ul>
                  <li>Cras in erat bibendum, rhoncus nisl ac, luctus tortor</li>
                  <li>Vivamus volutpat nunc non quam dapibus</li>
                  <li>Nulla molestie odio odio, ut congue dui</li>
                </ul>
              </div>
            </div>

            <div class="grid-3 mt-8 lg:mt-12">
              <div>
                <h4 class="mb-1 lg:mb-4">Company Name 3</h4>
                <p class="mb-1 text-sm">
                  <a href="https://resumewind.com/" target="_blank" rel="noreferrer">
                    companywebsite.com
                  </a>
                </p>
                <p class="text-sm">Jan. 2016 - Oct. 2019</p>
              </div>

              <div class="lg:col-span-2">
                <h4 class="mb-4">Job Title 3</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer a imperdiet urna. Praesent eu posuere magna, in
                  suscipit quam. Here is an example of an
                  <a href="https://resumewind.com/" target="_blank" rel="noreferrer">external link</a>.
                </p>
                <p>
                  Mauris ullamcorper neque in ultrices mollis. Sed justo eros,
                  mollis sed odio id, finibus gravida enim. Aenean pharetra ante
                  elit, sit amet accumsan felis suscipit vitae. Vestibulum ante
                  ipsum primis.
                </p>
                <ul>
                  <li>Cras in erat bibendum, rhoncus nisl ac, luctus tortor</li>
                  <li>Vivamus volutpat nunc non quam dapibus</li>
                  <li>Nulla molestie odio odio, ut congue dui</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3>Profile</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              semper sapien ligula, vestibulum eleifend erat pellentesque quis.
              Suspendisse potenti. Mauris et malesuada nisl, eu tempus nisi.
            </p>

            <h3 class="mt-12 lg:mt-16">Skills</h3>

            <h4>Programming Languages</h4>
            <ul>
              <li>JavaScript</li>
              <li>TypeScript</li>
              <li>Python</li>
              <li>PHP</li>
            </ul>

            <h4 class="mt-8">Libraries &amp; Frameworks</h4>
            <ul>
              <li>React.js</li>
              <li>Vue.js</li>
              <li>Next.js</li>
              <li>Gatsby.js</li>
            </ul>

            <h3 class="mt-12 lg:mt-16">Education</h3>
            <h4 class="mb-1">Name Of University</h4>
            <p class="mb-1">Enter Your Degree</p>

            <h3 class="mt-12 lg:mt-16">References</h3>

            <h4 class="mb-1">Reference Name 1</h4>
            <p>Reference Title 1</p>

            <h4 class="mt-8 mb-1">Reference Name 2</h4>
            <p class="mb-1">Reference Title 2</p>
          </div>
        </div>
      </div>
    </main>
</body>
 -->
</template>

<script>
import NavBar from '../components/Header/NavBar.vue'

export default {
  components: {
    NavBar
  },
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
