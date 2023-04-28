<template>
  <div class="page-wrapper">
    <div class="container-xl">
      <div class="page-header d-print-none">
        <div class="row g-2 align-items-center">
          <div class="col">
            <div class="page-pretitle">Resume</div>
            <h2 class="page-title">Tyree Zacharopoulos</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container-xl">
        <div class="row row-deck row-cards">
          <div class="col-sm-6 col-lg-2">
            <div class="card">
              <div class="card-body">
                <div class="d-flex align-items-center mb-2">
                  <div class="subheader">Contact</div>
                </div>
                <div class="p mb-1">
                  <a
                    href="tel:+17785319012"
                    style="text-decoration: none; font-family: 'Roboto Mono', monospace"
                    ><i class="ti ti-phone-call" style="font-size: 1.2rem"></i> +1(778)531 9012</a
                  >
                </div>
                <div class="p mb-1">
                  <a
                    href="mailto:tyree@tyree.ca"
                    style="text-decoration: none; font-family: 'Roboto Mono', monospace"
                    ><i class="ti ti-mail" style="font-size: 1.2rem"></i> tyree@tyree.ca</a
                  >
                </div>
                <div class="p mb-1">
                  <a
                    href="https://tyree.ca"
                    style="text-decoration: none; font-family: 'Roboto Mono', monospace"
                    ><i class="ti ti-world" style="font-size: 1.2rem"></i> tyree.ca</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3"></div>
          <div class="col-sm-6 col-lg-3"></div>

          <div class="col-lg-6">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Professional Experience</h3>
              </div>
              <div class="table-responsive">
                <table class="table table-vcenter card-table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Position</th>
                      <th>Duration</th>
                      <th>Location</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Theos Restaurant</td>
                      <td>Dishwasher</td>
                      <td>2017 – 2019</td>
                      <td>Penticton, BC</td>
                      <td>
                        <button
                          @click="toggleTheosModal"
                          id="theosModal"
                          type="button"
                          class="btn btn-sm btn-primary"
                        >
                          Details
                        </button>
                      </td>
                      <transition name="fade" appear>
                        <div
                          class="modal show modal-blur fade"
                          v-if="theosModalVisible"
                          style="display: block"
                          id="theosDetails"
                          tabindex="-1"
                          role="dialog"
                        >
                          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title">
                                  Details about my work at Theos Restaurant
                                </h5>
                                <button
                                  @click="toggleTheosModal"
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div class="modal-body">Data</div>
                              <div class="modal-footer">
                                <button
                                  @click="toggleTheosModal"
                                  type="button"
                                  class="btn me-auto"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </transition>
                    </tr>
                    <tr>
                      <td>Apex Premier Property Services</td>
                      <td>Landscaping</td>
                      <td>2019 – 2020</td>
                      <td>Penticton, BC</td>
                      <td>
                        <button
                          @click="toggleAppsModal"
                          id="appsModal"
                          type="button"
                          class="btn btn-sm btn-primary"
                        >
                          Details
                        </button>
                      </td>
                      <transition name="fade" appear>
                        <div
                          class="modal show modal-blur fade"
                          v-if="appsModalVisible"
                          style="display: block"
                          id="appsDetails"
                          tabindex="-1"
                          role="dialog"
                        >
                          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title">
                                  Details about my work at Apex Premier Property Services
                                </h5>
                                <button
                                  @click="toggleAppsModal"
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div class="modal-body">Data</div>
                              <div class="modal-footer">
                                <button
                                  @click="toggleAppsModal"
                                  type="button"
                                  class="btn me-auto"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </transition>
                    </tr>
                    <tr>
                      <td>J&R Millwork Ltd</td>
                      <td>Manufacturing</td>
                      <td>2020 – 2021</td>
                      <td>West Kelowna, BC</td>
                      <td>
                        <button
                          @click="toggleJrModal"
                          id="jrModal"
                          type="button"
                          class="btn btn-sm btn-primary"
                        >
                          Details
                        </button>
                      </td>
                      <transition name="fade" appear>
                        <div
                          class="modal show modal-blur fade"
                          v-if="jrModalVisible"
                          style="display: block"
                          id="jrDetails"
                          tabindex="-1"
                          role="dialog"
                        >
                          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title">
                                  Details about my work at J&R Millwork Ltd
                                </h5>
                                <button
                                  @click="toggleJrModal"
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div class="modal-body">Data</div>
                              <div class="modal-footer">
                                <button
                                  @click="toggleJrModal"
                                  type="button"
                                  class="btn me-auto"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </transition>
                    </tr>
                    <tr>
                      <td>Quality Movers</td>
                      <td>Labourer</td>
                      <td>2020 – 2021</td>
                      <td>Summerland, BC</td>
                      <td>
                        <button
                          @click="toggleQmModal"
                          id="qmModal"
                          type="button"
                          class="btn btn-sm btn-primary"
                        >
                          Details
                        </button>
                      </td>
                      <transition name="fade" appear>
                        <div
                          class="modal show modal-blur fade"
                          v-if="qmModalVisible"
                          style="display: block"
                          id="qmDetails"
                          tabindex="-1"
                          role="dialog"
                        >
                          <div
                            class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                            role="document"
                          >
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title">Details about my work at Quality Movers</h5>
                                <button
                                  @click="toggleQmModal"
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div class="modal-body">Data</div>
                              <div class="modal-footer">
                                <button
                                  @click="toggleQmModal"
                                  type="button"
                                  class="btn me-auto"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </transition>
                    </tr>
                    <tr>
                      <td>Neighbourhood Brewing Company</td>
                      <td>Kitchen Helper</td>
                      <td>2021 – Current</td>
                      <td>Penticton, BC</td>
                      <td>
                        <button
                          @click="toggleNbhdModal"
                          id="nbhdModal"
                          type="button"
                          class="btn btn-sm btn-primary"
                        >
                          Details
                        </button>
                      </td>
                      <transition name="fade" appear>
                        <div
                          class="modal show modal-blur fade"
                          v-if="nbhdModalVisible"
                          role="dialog"
                          style="display: block"
                        >
                          <div
                            class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                            role="document"
                          >
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title">
                                  My Work With Neighbourhood Brewing Company
                                </h5>
                                <button
                                  @click="toggleNbhdModal"
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div class="modal-body">
                                <p>
                                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                  Accusantium, possimus eius. Qui laudantium dignissimos
                                  exercitationem illum veniam totam tenetur vitae animi ea facilis
                                  voluptatibus, debitis dolorem, nostrum eos, nobis modi. Lorem
                                  ipsum dolor sit amet consectetur adipisicing elit. Perferendis
                                  recusandae maiores iure, earum voluptatem ullam explicabo fugit
                                  dignissimos temporibus mollitia vero obcaecati deserunt officiis
                                  quis facere. Consectetur nihil eveniet illum?
                                </p>
                              </div>
                              <div class="modal-footer">
                                <button
                                  @click="toggleNbhdModal"
                                  type="button"
                                  class="btn me-auto"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </transition>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theosModalVisible: false,
      appsModalVisible: false,
      jrModalVisible: false,
      qmModalVisible: false,
      nbhdModalVisible: false
    }
  },
  methods: {
    toggleTheosModal() {
      this.theosModalVisible = !this.theosModalVisible
    },
    toggleAppsModal() {
      this.appsModalVisible = !this.appsModalVisible
    },
    toggleJrModal() {
      this.jrModalVisible = !this.jrModalVisible
    },
    toggleQmModal() {
      this.qmModalVisible = !this.qmModalVisible
    },
    toggleNbhdModal() {
      this.nbhdModalVisible = !this.nbhdModalVisible
    }
  },
  beforeMount() {
    document.body.className = 'theme-dark'
  }
}
</script>
