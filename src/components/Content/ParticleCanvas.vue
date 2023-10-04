<template>
  <span class="canvasContent">
    <canvas id="canvas" />
  </span>
</template>

<script>
export default {
  watch: {
    particleColor(newValue, oldValue) {
      if (newValue !== oldValue) {
        // Color has changed, initiate a gradual transition
        this.transitionColor(oldValue, newValue)
      }
    }
  },
  mounted() {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    // detect if mobile device
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|iOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
    if (this.isMobile) {
      console.log('is mobile')
      this.maxParticles = Math.round(screen.height * 0.055)
      this.ConnectionDist = Math.round(screen.width * 0.3)
    } else {
      console.log('is not mobile')
      this.ConnectionDist = Math.round(screen.width * 0.1)
      this.maxParticles = Math.round(screen.height * 0.2)
    }
    this.radius = 2
    this.Msqrt = Math.sqrt
    this.Mrandom = Math.random
    console.log(`${this.maxParticles} is the particle count`)
    console.log(`${this.ConnectionDist} is the connection distance between nodes`)
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
    this.createParticles()
    this.animate()
    this.startAPICheck()
    this.getParticleColor()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
    cancelAnimationFrame(this.animation)
  },
  methods: {
    async startAPICheck() {
      let previousColor = await this.getParticleColor()
      setInterval(async () => {
        const newColor = await this.getParticleColor()
        if (newColor !== previousColor) {
          this.particleColor = newColor
          this.previousParticleColor = previousColor
          previousColor = newColor
          this.transitionColor(previousColor, newColor)
        }
      }, 5000)
    },
    transitionColor(startColor, endColor) {
      const animationDuration = 1000 // Duration of the color transition in milliseconds
      const framesPerSecond = 60 // Number of frames per second for the transition animation
      const frameDuration = 1000 / framesPerSecond
      const colorIncrement = (endColor - startColor) / (animationDuration / frameDuration)

      let currentColor = startColor
      let animationFrame

      const updateColor = () => {
        if (
          (colorIncrement >= 0 && currentColor <= endColor) ||
          (colorIncrement < 0 && currentColor >= endColor)
        ) {
          this.updateParticleColor(currentColor)
          currentColor += colorIncrement
          animationFrame = requestAnimationFrame(updateColor)
        } else {
          this.updateParticleColor(endColor)
          cancelAnimationFrame(animationFrame)
        }
      }

      updateColor()
    },

    updateParticleColor(color) {
      const hue = Math.round(color)
      this.particles.forEach((particle) => {
        particle.strokeColour.h = hue
      })
    },

    async getParticleColor() {
      try {
        const response = await fetch('https://particles.falkor.workers.dev/')
        const data = await response.json()
        console.log(data)
        this.particleColor = data.color
        console.log(this.particleColor)

        if (this.particleColor !== this.previousParticleColor) {
          this.previousParticleColor = this.particleColor
          this.updateParticleColors()
        }
      } catch (error) {
        console.log(error)
        this.particleColor = 360
      }
    },
    updateParticleColors() {
      this.particles.forEach((particle) => {
        particle.strokeColour.h = this.particleColor
      })
    },
    handleResize() {
      const dpr = window.devicePixelRatio
      this.ctx.scale(dpr, dpr)
      this.w = this.canvas.width = window.innerWidth
      this.h = this.canvas.height = window.innerHeight
      this.midX = this.w * 0
    },
    createParticles() {
      let vRange = 2,
        vMin = 0.0001,
        vx,
        vy
      for (let i = 0; i < this.maxParticles; i++) {
        vx = this.Mrandom() * vRange + vMin
        vy = this.Mrandom() * vRange + vMin
        if (this.Mrandom() > 0.5) {
          vx *= -1
        }
        if (this.Mrandom() > 0.5) {
          vy *= -1
        }
        this.particles.push({
          x: this.Mrandom() * this.w - this.radius,
          y: this.Mrandom() * this.h - this.radius,
          xv: this.Mrandom() * vx,
          yv: this.Mrandom() * vy,
          strokeColour: { h: this.particleColor, s: 1 }
        })
      }
    },
    update() {
      let p
      for (let loop = this.particles.length, i = 0; i < loop; i++) {
        p = this.particles[i]
        // move
        p.x += p.xv
        p.y += p.yv
        // keep in bounds
        if (p.x < 0) {
          p.x = 0
          p.xv *= -1
        } else if (p.x > this.w) {
          p.x = this.w
          p.xv *= -1
        }
        if (p.y < 0) {
          p.y = 0
          p.yv *= -1
        } else if (p.y > this.h) {
          p.y = this.h
          p.yv *= -1
        }
      }
    },
    connect() {
      let p1, p2, currentDist
      for (let i = 0; i < this.maxParticles - 1; i++) {
        p1 = this.particles[i]
        for (let j = i + 1; j < this.maxParticles; j++) {
          p2 = this.particles[j]
          currentDist = this.getDistance(p2.x, p1.x, p2.y, p1.y)
          if (currentDist < this.ConnectionDist) {
            this.ctx.beginPath()
            this.ctx.moveTo(p1.x, p1.y)
            this.ctx.strokeStyle =
              'hsla(' +
              p1.strokeColour.h +
              ', 65%, 45%, ' +
              (1 - (currentDist * 100) / this.ConnectionDist / 100) +
              ')'
            this.ctx.lineWidth = 2
            this.ctx.lineTo(p2.x, p2.y)
            this.ctx.stroke()
          }
        }
      }
    },
    getDistance(x1, x2, y1, y2) {
      let xDiff = x1 - x2
      let yDiff = y1 - y2
      return this.Msqrt(xDiff * xDiff + yDiff * yDiff)
    },
    draw() {
      this.ctx.clearRect(0, 0, this.w, this.h)
      this.update()
      this.connect()
      let p
      for (let loop = this.particles.length, i = 0; i < loop; i++) {
        p = this.particles[i]
        this.ctx.beginPath()
        this.ctx.arc(p.x, p.y, this.radius, 0, Math.PI * 2)
        this.ctx.fillStyle = 'hsla(' + p.strokeColour.h + ', 55%, 25%, 1)'
        this.ctx.fill()
      }
    },
    animate() {
      this.animation = requestAnimationFrame(this.animate)
      this.draw()
    }
  },
  data() {
    return {
      previousParticleColor: null,
      particleColor: 278,
      canvas: null,
      ctx: null,
      w: null,
      h: null,
      midX: null,
      particles: [],
      ConnectionDist: null,
      maxParticles: null,
      radius: null,
      Msqrt: null,
      Mrandom: null,
      animation: null
    }
  }
}
</script>

<style scoped>
canvas {
  background-color: black;
}
</style>
