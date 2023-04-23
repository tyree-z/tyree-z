function x64Add(t, e) {
  ;(t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]]),
    (e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]])
  var $ = [0, 0, 0, 0]
  return (
    ($[3] += t[3] + e[3]),
    ($[2] += $[3] >>> 16),
    ($[3] &= 65535),
    ($[2] += t[2] + e[2]),
    ($[1] += $[2] >>> 16),
    ($[2] &= 65535),
    ($[1] += t[1] + e[1]),
    ($[0] += $[1] >>> 16),
    ($[1] &= 65535),
    ($[0] += t[0] + e[0]),
    ($[0] &= 65535),
    [($[0] << 16) | $[1], ($[2] << 16) | $[3]]
  )
}

function x64Multiply(t, e) {
  ;(t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]]),
    (e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]])
  var $ = [0, 0, 0, 0]
  return (
    ($[3] += t[3] * e[3]),
    ($[2] += $[3] >>> 16),
    ($[3] &= 65535),
    ($[2] += t[2] * e[3]),
    ($[1] += $[2] >>> 16),
    ($[2] &= 65535),
    ($[2] += t[3] * e[2]),
    ($[1] += $[2] >>> 16),
    ($[2] &= 65535),
    ($[1] += t[1] * e[3]),
    ($[0] += $[1] >>> 16),
    ($[1] &= 65535),
    ($[1] += t[2] * e[2]),
    ($[0] += $[1] >>> 16),
    ($[1] &= 65535),
    ($[1] += t[3] * e[1]),
    ($[0] += $[1] >>> 16),
    ($[1] &= 65535),
    ($[0] += t[0] * e[3] + t[1] * e[2] + t[2] * e[1] + t[3] * e[0]),
    ($[0] &= 65535),
    [($[0] << 16) | $[1], ($[2] << 16) | $[3]]
  )
}
function x64Rotl(t, e) {
  return 32 == (e %= 64)
    ? [t[1], t[0]]
    : e < 32
    ? [(t[0] << e) | (t[1] >>> (32 - e)), (t[1] << e) | (t[0] >>> (32 - e))]
    : ((e -= 32), [(t[1] << e) | (t[0] >>> (32 - e)), (t[0] << e) | (t[1] >>> (32 - e))])
}
function x64LeftShift(t, e) {
  return 0 == (e %= 64)
    ? t
    : e < 32
    ? [(t[0] << e) | (t[1] >>> (32 - e)), t[1] << e]
    : [t[1] << (e - 32), 0]
}
function x64Xor(t, e) {
  return [t[0] ^ e[0], t[1] ^ e[1]]
}
function x64Fmix(t) {
  return (
    (t = x64Multiply((t = x64Xor(t, [0, t[0] >>> 1])), [4283543511, 3981806797])),
    (t = x64Multiply((t = x64Xor(t, [0, t[0] >>> 1])), [3301882366, 444984403])),
    (t = x64Xor(t, [0, t[0] >>> 1]))
  )
}
function x64hash128(t, e) {
  e = e || 0
  for (
    var $ = (t = t || '').length % 16,
      f = t.length - $,
      x = [0, e],
      r = [0, e],
      h = [0, 0],
      o = [0, 0],
      _ = [2277735313, 289559509],
      i = [1291169091, 658871167],
      c = 0;
    c < f;
    c += 16
  )
    (h = [
      (255 & t.charCodeAt(c + 4)) |
        ((255 & t.charCodeAt(c + 5)) << 8) |
        ((255 & t.charCodeAt(c + 6)) << 16) |
        ((255 & t.charCodeAt(c + 7)) << 24),
      (255 & t.charCodeAt(c)) |
        ((255 & t.charCodeAt(c + 1)) << 8) |
        ((255 & t.charCodeAt(c + 2)) << 16) |
        ((255 & t.charCodeAt(c + 3)) << 24)
    ]),
      (o = [
        (255 & t.charCodeAt(c + 12)) |
          ((255 & t.charCodeAt(c + 13)) << 8) |
          ((255 & t.charCodeAt(c + 14)) << 16) |
          ((255 & t.charCodeAt(c + 15)) << 24),
        (255 & t.charCodeAt(c + 8)) |
          ((255 & t.charCodeAt(c + 9)) << 8) |
          ((255 & t.charCodeAt(c + 10)) << 16) |
          ((255 & t.charCodeAt(c + 11)) << 24)
      ]),
      (h = x64Rotl((h = x64Multiply(h, _)), 31)),
      (x = x64Add((x = x64Rotl((x = x64Xor(x, (h = x64Multiply(h, i)))), 27)), r)),
      (x = x64Add(x64Multiply(x, [0, 5]), [0, 1390208809])),
      (o = x64Rotl((o = x64Multiply(o, i)), 33)),
      (r = x64Add((r = x64Rotl((r = x64Xor(r, (o = x64Multiply(o, _)))), 31)), x)),
      (r = x64Add(x64Multiply(r, [0, 5]), [0, 944331445]))
  switch (((h = [0, 0]), (o = [0, 0]), $)) {
    case 15:
      o = x64Xor(o, x64LeftShift([0, t.charCodeAt(c + 14)], 48))
    case 14:
      o = x64Xor(o, x64LeftShift([0, t.charCodeAt(c + 13)], 40))
    case 13:
      o = x64Xor(o, x64LeftShift([0, t.charCodeAt(c + 12)], 32))
    case 12:
      o = x64Xor(o, x64LeftShift([0, t.charCodeAt(c + 11)], 24))
    case 11:
      o = x64Xor(o, x64LeftShift([0, t.charCodeAt(c + 10)], 16))
    case 10:
      o = x64Xor(o, x64LeftShift([0, t.charCodeAt(c + 9)], 8))
    case 9:
      ;(o = x64Rotl((o = x64Multiply((o = x64Xor(o, [0, t.charCodeAt(c + 8)])), i)), 33)),
        (r = x64Xor(r, (o = x64Multiply(o, _))))
    case 8:
      h = x64Xor(h, x64LeftShift([0, t.charCodeAt(c + 7)], 56))
    case 7:
      h = x64Xor(h, x64LeftShift([0, t.charCodeAt(c + 6)], 48))
    case 6:
      h = x64Xor(h, x64LeftShift([0, t.charCodeAt(c + 5)], 40))
    case 5:
      h = x64Xor(h, x64LeftShift([0, t.charCodeAt(c + 4)], 32))
    case 4:
      h = x64Xor(h, x64LeftShift([0, t.charCodeAt(c + 3)], 24))
    case 3:
      h = x64Xor(h, x64LeftShift([0, t.charCodeAt(c + 2)], 16))
    case 2:
      h = x64Xor(h, x64LeftShift([0, t.charCodeAt(c + 1)], 8))
    case 1:
      ;(h = x64Rotl((h = x64Multiply((h = x64Xor(h, [0, t.charCodeAt(c)])), _)), 31)),
        (x = x64Xor(x, (h = x64Multiply(h, i))))
  }
  return (
    (x = x64Xor(x, [0, t.length])),
    (r = x64Xor(r, [0, t.length])),
    (x = x64Add(x, r)),
    (r = x64Add(r, x)),
    (x = x64Fmix(x)),
    (r = x64Fmix(r)),
    (x = x64Add(x, r)),
    (r = x64Add(r, x)),
    ('00000000' + (x[0] >>> 0).toString(16)).slice(-8) +
      ('00000000' + (x[1] >>> 0).toString(16)).slice(-8) +
      ('00000000' + (r[0] >>> 0).toString(16)).slice(-8) +
      ('00000000' + (r[1] >>> 0).toString(16)).slice(-8)
  )
}
function picassoCanvas(t, e, $) {
  let { area: f, offsetParameter: x, multiplier: r, fontSizeFactor: h, maxShadowBlur: o } = $
  function _(t, e, $) {
    return ((t = (t - 1) / x), $) ? t * e : Math.floor(t * e)
  }
  function i(t, e, $) {
    let f = e.createRadialGradient(
      _(t.getNext(), $.width),
      _(t.getNext(), $.height),
      _(t.getNext(), $.width),
      _(t.getNext(), $.width),
      _(t.getNext(), $.height),
      _(t.getNext(), $.width)
    )
    f.addColorStop(0, c[_(t.getNext(), c.length)]),
      f.addColorStop(1, c[_(t.getNext(), c.length)]),
      (e.fillStyle = f)
  }
  if (!window.CanvasRenderingContext2D) return 'unknown'
  let c = [
      '#FF6633',
      '#FFB399',
      '#FF33FF',
      '#FFFF99',
      '#00B3E6',
      '#E6B333',
      '#3366E6',
      '#999966',
      '#99FF99',
      '#B34D4D',
      '#80B300',
      '#809900',
      '#E6B3B3',
      '#6680B3',
      '#66991A',
      '#FF99E6',
      '#CCFF1A',
      '#FF1A66',
      '#E6331A',
      '#33FFCC',
      '#66994D',
      '#B366CC',
      '#4D8000',
      '#B33300',
      '#CC80CC',
      '#66664D',
      '#991AFF',
      '#E666FF',
      '#4DB3FF',
      '#1AB399',
      '#E666B3',
      '#33991A',
      '#CC9999',
      '#B3B31A',
      '#00E680',
      '#4D8066',
      '#809980',
      '#E6FF80',
      '#1AFF33',
      '#999933',
      '#FF3380',
      '#CCCC00',
      '#66E64D',
      '#4D80CC',
      '#9900B3',
      '#E64D66',
      '#4DB380',
      '#FF4D4D',
      '#99E6E6',
      '#6666FF'
    ],
    a = [
      function t(e, $, f) {
        $.beginPath(),
          $.arc(
            _(e.getNext(), f.width),
            _(e.getNext(), f.height),
            _(e.getNext(), Math.min(f.width, f.height)),
            _(e.getNext(), 2 * Math.PI, !0),
            _(e.getNext(), 2 * Math.PI, !0)
          ),
          $.stroke()
      },
      function t(e, $, f) {
        let x = Math.max(1, _(e.getNext(), 5)),
          r = (function t(e, $) {
            let f = []
            for (let x = 0; x < $; x++) {
              let r = 65 + (e.getNext() % 61)
              f.push(String.fromCharCode(r))
            }
            return f.join('')
          })(e, x)
        ;($.font = `${f.height / h}px aafakefontaa`),
          $.strokeText(
            r,
            _(e.getNext(), f.width),
            _(e.getNext(), f.height),
            _(e.getNext(), f.width)
          )
      },
      function t(e, $, f) {
        $.beginPath(),
          $.moveTo(_(e.getNext(), f.width), _(e.getNext(), f.height)),
          $.bezierCurveTo(
            _(e.getNext(), f.width),
            _(e.getNext(), f.height),
            _(e.getNext(), f.width),
            _(e.getNext(), f.height),
            _(e.getNext(), f.width),
            _(e.getNext(), f.height)
          ),
          $.stroke()
      },
      function t(e, $, f) {
        $.beginPath(),
          $.moveTo(_(e.getNext(), f.width), _(e.getNext(), f.height)),
          $.quadraticCurveTo(
            _(e.getNext(), f.width),
            _(e.getNext(), f.height),
            _(e.getNext(), f.width),
            _(e.getNext(), f.height)
          ),
          $.stroke()
      },
      function t(e, $, f) {
        $.beginPath(),
          $.ellipse(
            _(e.getNext(), f.width),
            _(e.getNext(), f.height),
            _(e.getNext(), Math.floor(f.width / 2)),
            _(e.getNext(), Math.floor(f.height / 2)),
            _(e.getNext(), 2 * Math.PI, !0),
            _(e.getNext(), 2 * Math.PI, !0),
            _(e.getNext(), 2 * Math.PI, !0)
          ),
          $.stroke()
      }
    ]
  try {
    let d = new (class t {
        constructor(t) {
          ;(this.currentNumber = t % x), this.currentNumber <= 0 && (this.currentNumber += x)
        }
        getNext() {
          return (this.currentNumber = (r * this.currentNumber) % x), this.currentNumber
        }
      })(e),
      n = document.createElement('canvas')
    ;(n.width = f.width), (n.height = f.height), (n.style.display = 'none')
    let g = n.getContext('2d')
    for (let l = 0; l < t; l++) {
      i(d, g, f), (g.shadowBlur = _(d.getNext(), o)), (g.shadowColor = c[_(d.getNext(), c.length)])
      let u = a[_(d.getNext(), a.length)]
      u(d, g, f), g.fill()
    }
    return x64hash128(n.toDataURL(), e)
  } catch (C) {}
}
