let canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  w,
  midX,
  h,
  particles = []

const Tau = Math.PI * 1,
  ConnectionDist = Math.round(window.innerWidth * 0.08),
  maxParticles = Math.round(window.innerHeight * 0.18),
  radius = 2,
  Msqrt = Math.sqrt,
  Mrandom = Math.random

console.log(`${maxParticles} is the particle count`)
console.log(`${ConnectionDist} is the connection distance between nodes`)

function handleResize() {
  w = ctx.canvas.width = window.innerWidth
  h = ctx.canvas.height = window.innerHeight
  midX = w * 0
}
window.onresize = () => handleResize()
handleResize()

function createParticles() {
  let vRange = 1,
    vMin = 0.5,
    vx,
    vy
  for (let i = 0; i < maxParticles; i++) {
    vx = Mrandom() * vRange + vMin
    vy = Mrandom() * vRange + vMin
    if (Mrandom() > 0.5) {
      vx *= -1
    }
    if (Mrandom() > 0.5) {
      vy *= -1
    }
    particles.push({
      x: Mrandom() * w - radius,
      y: Mrandom() * h - radius,
      xv: Mrandom() * vx,
      yv: Mrandom() * vy,
      strokeColour: { h: 0, s: 1 }
    })
  }
}

function update() {
  let p
  for (let loop = particles.length, i = 0; i < loop; i++) {
    p = particles[i]
    // move
    p.x += p.xv
    p.y += p.yv
    // keep in bounds
    if (p.x < 0) {
      p.x = 0
      p.xv *= -1
    } else if (p.x > w) {
      p.x = w
      p.xv *= -1
    }
    if (p.y < 0) {
      p.y = 0
      p.yv *= -1
    } else if (p.y > h) {
      p.y = h
      p.yv *= -1
    }
  }
}

function connect() {
  let p1, p2
  for (let i = 0; i < maxParticles - 1; i++) {
    p1 = particles[i]
    for (let j = i + 1; j < maxParticles; j++) {
      p2 = particles[j]
      currentDist = getDistance(p2.x, p1.x, p2.y, p1.y)
      if (currentDist < ConnectionDist) {
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.strokeStyle =
          'hsla(' +
          280 +
          ', 100%, 50%, ' +
          (1 - ((currentDist * 100) / ConnectionDist) * 0.01) +
          ')'
        ctx.lineWidth = 2
        ctx.lineTo(p2.x, p2.y, p1.x, p1.y)
        ctx.stroke()
      }
    }
  }
}

function draw() {
  let p, d
  for (let loop = particles.length, i = 0; i < loop; i++) {
    p = particles[i]
    d = getDistance(midX, p.x, h, p.y)
    p.hue = d
    ctx.beginPath()
    ctx.fillStyle = 'hsla(' + 280 + ' , 50%, 30%, 1)'
    ctx.arc(p.x, p.y, radius, 0, Tau)
    ctx.fill()
  }
}

function getDistance(x1, x2, y1, y2) {
  let a = x1 - x2,
    b = y1 - y2
  return Msqrt(a * a + b * b)
}

function animate() {
  canvas.width = w
  update()
  connect()
  draw()
  requestAnimationFrame(animate)
}

createParticles()
animate()
