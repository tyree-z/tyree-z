<template>
  <noscript>
    <strong
      >We're sorry but this site doesn't work properly without JavaScript enabled. Please enable it
      to continue.</strong
    >
  </noscript>
</template>
<script>
export default {
  name: 'ParticleCanvas',
  mounted() {
    const script = document.createElement('script')
    script.src = 'https://files.cdn0.ca/tyree/root/js/particles.js'
    script.onload = () => {
      console.log('Particles loaded!')
    }
    script.async = true
    document.body.appendChild(script)
  }
}
</script>

<style scoped></style>
