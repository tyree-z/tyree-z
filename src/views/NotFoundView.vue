<script setup>
import ParticleCanvas from '../components/Content/ParticleCanvas.vue'
</script>
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
      <canvas id="canvas">
        <ParticleCanvas />
      </canvas>
    </div>
    <dialog class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Hello!</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>
