<template>
  <div class="page-wrapper">
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-P6JFTPR"
        height="0"
        width="0"
        style="display: none; visibility: hidden"
      ></iframe>
    </noscript>
    <div class="canvasContent">
      <canvas id="canvas"></canvas>
      <!-- TODO -->
      <component
        :is="'script'"
        type="application/javascript"
        defer
        src="https://files.cdn0.ca/tyree/root/js/particles.js"
      ></component>
      <!-- /TODO -->
    </div>
    <div
      class="modal modal-blur fade show"
      id="modal-simple"
      tabindex="-1"
      style="display: block"
      aria-modal="true"
      role="dialog"
    >
      <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Not Found 😞</h5>
          </div>
          <div class="modal-body">The Page you're looking for was not found. <br /></div>
          <div class="modal-footer">
            <router-link to="/">
              <button type="button" class="btn me-auto" data-bs-dismiss="modal">Go Back</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
