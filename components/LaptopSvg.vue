<template>
  <div class="laptop-wrap"
    ref="wrapEl"
    @click="onWrapClick">
    <svg class="laptop-svg"
      viewBox="0 0 1100 800"
      aria-labelledby="lapTitle"
      preserveAspectRatio="xMidYMid meet">
      <title id="lapTitle">Thuso Mokopotsa — Senior Frontend Developer. Vue.js, React, WebRTC.</title>
      <defs>
        <filter id="wobble"
          x="-5%"
          y="-5%"
          width="110%"
          height="110%">
          <feTurbulence type="fractalNoise"
            baseFrequency="0.022"
            numOctaves="2"
            seed="4"
            result="t" />
          <feDisplacementMap in="SourceGraphic"
            in2="t"
            scale="3" />
        </filter>
        <filter id="wobble-strong"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%">
          <feTurbulence type="fractalNoise"
            baseFrequency="0.03"
            numOctaves="2"
            seed="7"
            result="t" />
          <feDisplacementMap in="SourceGraphic"
            in2="t"
            scale="5" />
        </filter>
        <radialGradient id="screen-radiance"
          cx="0.5"
          cy="0.5"
          r="0.7">
          <stop offset="0%"
            stop-color="#bc8cff"
            stop-opacity="0.35" />
          <stop offset="55%"
            stop-color="#58c7ff"
            stop-opacity="0.08" />
          <stop offset="100%"
            stop-color="#0d1117"
            stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Doodles -->
      <g filter="url(#wobble-strong)"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2">
        <path class="doodle-star"
          d="M 70 150 L 82 178 L 110 180 L 88 197 L 96 225 L 70 210 L 44 225 L 52 197 L 30 180 L 58 178 Z"
          stroke="#f5c518"
          opacity="0.75" />
        <path class="doodle-sq"
          d="M 980 130 Q 995 112 1010 130 T 1040 130 T 1070 130"
          stroke="#ff7ab6"
          opacity="0.8" />
        <g class="doodle-dots"
          stroke="#58c7ff"
          fill="#58c7ff"
          opacity="0.75">
          <circle cx="80"
            cy="680"
            r="3" />
          <circle cx="95"
            cy="695"
            r="2" />
          <circle cx="65"
            cy="700"
            r="2" />
          <circle cx="105"
            cy="670"
            r="1.8" />
        </g>
        <g class="doodle-ast"
          stroke="#39d4c0"
          opacity="0.8">
          <path d="M 1020 700 L 1020 730" />
          <path d="M 1005 715 L 1035 715" />
          <path d="M 1010 705 L 1030 725" />
          <path d="M 1030 705 L 1010 725" />
        </g>
        <path class="doodle-spiral"
          d="M 1030 400 q -10 -10 -20 0 q -10 10 0 22 q 12 12 26 -2 q 14 -14 -4 -32"
          stroke="#bc8cff"
          opacity="0.75" />
      </g>

      <!-- Chassis -->
      <g filter="url(#wobble)"
        fill="none"
        stroke="#f5f1e8"
        stroke-width="2.8"
        stroke-linecap="round"
        stroke-linejoin="round">
        <path d="M 160 620 L 940 620 L 1020 740 L 80 740 Z" />
        <path d="M 140 620 L 960 620"
          stroke-dasharray="4 6"
          opacity="0.75" />
        <g ref="keyboardEl"></g>
        <path d="M 470 700 Q 550 696 630 700 L 640 726 Q 550 732 460 726 Z" />
        <path d="M 550 714 L 550 728"
          opacity="0.6" />
        <path d="M 930 612 L 948 612 L 950 618 L 928 618 Z"
          fill="#161b22" />
        <path d="M 930 612 L 948 612 L 950 618 L 928 618 Z"
          stroke="#f5f1e8"
          stroke-width="1.2"
          fill="none" />
        <path d="M 939 614 L 939 617"
          stroke="#8b949e"
          stroke-width="1" />
        <path d="M 936 615 Q 939 618 942 615"
          stroke="#8b949e"
          stroke-width="1"
          fill="none" />
        <path d="M 180 100 L 920 100 L 940 620 L 160 620 Z" />
        <path d="M 210 132 L 890 132 L 908 590 L 192 590 Z"
          fill="#090c14"
          stroke="#f5f1e8"
          stroke-width="2.4" />
        <circle cx="550"
          cy="116"
          r="3"
          fill="#f5f1e8"
          stroke="none" />
      </g>
      <path class="screen-glow"
        d="M 210 132 L 890 132 L 908 590 L 192 590 Z"
        fill="url(#screen-radiance)"
        pointer-events="none" />
      <circle class="power-led"
        cx="500"
        cy="730"
        r="2.5"
        fill="#3fb950" />

      <!-- Portrait + wheel -->
      <g class="portrait"
        @mouseenter="onPortraitEnter"
        @mouseleave="onPortraitLeave"
        @touchstart.passive="onPortraitEnter"
        @touchend.passive="() => setTimeout(onPortraitLeave, 1400)">
        <rect x="300"
          y="150"
          width="500"
          height="440"
          fill="transparent"
          pointer-events="all" />
        <g filter="url(#wobble)"
          fill="none"
          stroke="#f5f1e8"
          stroke-width="2.8"
          stroke-linecap="round"
          stroke-linejoin="round">
          <g ref="faceEl"
            class="face">
            <g transform="translate(550 360)">
              <ellipse cx="0"
                cy="0"
                rx="56"
                ry="64" />
              <path d="M -42 -58 Q -30 -78 -14 -68 Q 0 -82 16 -68 Q 32 -80 44 -58" />
              <path d="M -20 -72 Q -14 -80 -6 -74" />
              <path d="M 10 -74 Q 18 -82 24 -74" />
              <path d="M -28 -16 Q -18 -22 -8 -18" />
              <path d="M 8 -18 Q 18 -22 28 -16" />
              <circle class="eye left"
                cx="-17"
                cy="-4"
                r="3"
                fill="#f5f1e8" />
              <circle class="eye right"
                cx="17"
                cy="-4"
                r="3"
                fill="#f5f1e8" />
              <path d="M 0 -2 Q -5 10 -6 18 Q -2 22 2 22 Q 6 22 6 18 Q 5 10 0 -2" />
              <path class="mouth"
                d="M -16 32 Q 0 42 16 32" />
              <path d="M -56 -4 Q -66 2 -60 14" />
              <path d="M 56 -4 Q 66 2 60 14" />
            </g>
          </g>
          <g ref="ringsEl"
            class="rings"></g>
          <g ref="arrowsEl"
            class="arrows"></g>
        </g>
        <g ref="labelsEl"
          class="svg-labels"
          font-size="34"></g>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { SEGMENTS } from '~/data/index'
import { useActiveSegment } from '~/composables/useActiveSegment'

const emit = defineEmits<{ (e: 'exitCenter'): void }>()
const props = defineProps<{ centerMode: boolean }>()

const { activeIdx, setActive } = useActiveSegment()
const wrapEl = ref<HTMLElement | null>(null)
const keyboardEl = ref<SVGGElement | null>(null)
const ringsEl = ref<SVGGElement | null>(null)
const arrowsEl = ref<SVGGElement | null>(null)
const labelsEl = ref<SVGGElement | null>(null)

const SVG_NS = 'http://www.w3.org/2000/svg'
const mk = (tag: string, attrs: Record<string, string>) => {
  const el = document.createElementNS(SVG_NS, tag)
  for (const k in attrs) el.setAttribute(k, attrs[k])
  return el
}

const cx = 550, cy = 360, rI = 82, rO = 122, rAS = 128, rAE = 168, rL = 200
const d2r = (d: number) => d * Math.PI / 180
const pt = (r: number, a: number): [number, number] => [cx + r * Math.cos(d2r(a)), cy + r * Math.sin(d2r(a))]
const rnd = (a: number, b: number) => a + Math.random() * (b - a)
const anchorFor = (a: number) => { if (a === 90 || a === 270) return 'middle'; return (a < 90 || a > 270) ? 'start' : 'end' }

let labelLinkEls: SVGAElement[] = []

function buildKeyboard() {
  if (!keyboardEl.value) return
  const rows = [
    { y: 632, keys: 13, h: 12, spread: 0 }, { y: 648, keys: 13, h: 12, spread: 6 },
    { y: 664, keys: 12, h: 12, spread: 12 }, { y: 680, keys: 11, h: 12, spread: 18 }
  ]
  const L = 198, R = 902, gap = 3
  rows.forEach((row, ri) => {
    const kw = (R - L - gap * (row.keys - 1)) / row.keys
    for (let k = 0; k < row.keys; k++) {
      const x = L + k * (kw + gap) + ri * 4
      keyboardEl.value!.appendChild(mk('rect', {
        x: (x + (Math.random() - .5) * .8).toFixed(2), y: (row.y + (Math.random() - .5) * .6).toFixed(2),
        width: kw.toFixed(2), height: String(row.h), rx: '2', ry: '2',
        fill: '#161b22', stroke: '#f5f1e8', 'stroke-width': '1.2', opacity: '0.9'
      }))
    }
  })
  keyboardEl.value!.appendChild(mk('rect', { x: '380', y: '694', width: '340', height: '10', rx: '3', ry: '3', fill: '#161b22', stroke: '#f5f1e8', 'stroke-width': '1.2', opacity: '0.9' }))
}

function buildWheel() {
  if (!ringsEl.value || !arrowsEl.value || !labelsEl.value) return
  labelLinkEls = []

  SEGMENTS.forEach((s, idx) => {
    const hs = 21, a1 = s.a - hs, a2 = s.a + hs
    const [x1, y1] = pt(rO, a1), [x2, y2] = pt(rO, a2), [x3, y3] = pt(rI, a2), [x4, y4] = pt(rI, a1)
    const sg = mk('g', { 'data-seg': s.label })
    sg.appendChild(mk('path', { d: `M ${x1} ${y1} A ${rO} ${rO} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rI} ${rI} 0 0 0 ${x4} ${y4} Z`, fill: s.c, 'fill-opacity': '.14', stroke: s.c, 'stroke-opacity': '.85', 'stroke-width': '2.8', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }))
    for (let i = 0; i < 22; i++) {
      const ang = a1 + ((a2 - a1) * (i + rnd(-.3, .3))) / 21
      const [sx, sy] = pt(rI + rnd(-2, 4), ang), [ex, ey] = pt(rO + rnd(-4, 2), ang)
      sg.appendChild(mk('path', { d: `M ${sx.toFixed(2)} ${sy.toFixed(2)} L ${ex.toFixed(2)} ${ey.toFixed(2)}`, stroke: s.c, 'stroke-width': rnd(1.1, 2.4).toFixed(2), 'stroke-linecap': 'round', opacity: rnd(.55, .9).toFixed(2) }))
    }
    ringsEl.value!.appendChild(sg)

    const [ax1, ay1] = pt(rAS, s.a), [ax2, ay2] = pt(rAE, s.a), [mx, my] = pt((rAS + rAE) / 2, s.a)
    const off = rnd(-9, 9), cpx = mx + off * Math.cos(d2r(s.a + 90)), cpy = my + off * Math.sin(d2r(s.a + 90))
    arrowsEl.value!.appendChild(mk('path', { d: `M ${ax1.toFixed(2)} ${ay1.toFixed(2)} Q ${cpx.toFixed(2)} ${cpy.toFixed(2)} ${ax2.toFixed(2)} ${ay2.toFixed(2)}`, stroke: s.c, 'stroke-width': '2.8', fill: 'none', 'stroke-linecap': 'round' }))
    const hl = 12
    const [h1x, h1y] = [ax2 - hl * Math.cos(d2r(s.a - 26)), ay2 - hl * Math.sin(d2r(s.a - 26))]
    const [h2x, h2y] = [ax2 - hl * Math.cos(d2r(s.a + 26)), ay2 - hl * Math.sin(d2r(s.a + 26))]
    arrowsEl.value!.appendChild(mk('path', { d: `M ${h1x.toFixed(2)} ${h1y.toFixed(2)} L ${ax2.toFixed(2)} ${ay2.toFixed(2)} L ${h2x.toFixed(2)} ${h2y.toFixed(2)}`, stroke: s.c, 'stroke-width': '2.8', fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }))

    const [lx, ly] = pt(rL, s.a), rot = rnd(-5, 5).toFixed(1), anchor = anchorFor(s.a), lw = s.label.length * 13
    let ux0 = lx
    if (anchor === 'start') ux0 = lx + 2
    else if (anchor === 'middle') ux0 = lx - lw / 2
    else ux0 = lx - lw - 2

    const link = mk('a', { role: 'button', tabindex: '0', 'aria-label': `${s.label}: ${s.desc}`, 'data-label': s.label, 'data-idx': String(idx) }) as SVGAElement
    link.appendChild(mk('ellipse', { class: 'lbl-halo', cx: (ux0 + lw / 2).toFixed(2), cy: ly.toFixed(2), rx: (lw / 2 + 14).toFixed(2), ry: '22', fill: s.c, 'fill-opacity': '.12', stroke: s.c, 'stroke-opacity': '.55', 'stroke-width': '2', 'stroke-dasharray': '4 5', transform: `rotate(${rot} ${lx.toFixed(2)} ${ly.toFixed(2)})` }))
    const txt = mk('text', { x: lx.toFixed(2), y: ly.toFixed(2), fill: s.c, 'text-anchor': anchor, 'dominant-baseline': 'middle', 'font-family': "'Caveat',cursive", 'font-weight': '700', 'font-size': '56', transform: `rotate(${rot} ${lx.toFixed(2)} ${ly.toFixed(2)})`, style: `filter:drop-shadow(0 0 10px ${s.c}55);` })
    txt.textContent = s.label; link.appendChild(txt)
    const uy = ly + 22, ux1 = ux0 + lw, uMid = (ux0 + ux1) / 2
    link.appendChild(mk('path', { class: 'lbl-underline', d: `M ${ux0.toFixed(2)} ${uy.toFixed(2)} Q ${uMid.toFixed(2)} ${(uy - 6).toFixed(2)} ${ux1.toFixed(2)} ${uy.toFixed(2)}`, stroke: s.c, 'stroke-width': '2.2', fill: 'none', 'stroke-linecap': 'round', opacity: '.75', transform: `rotate(${rot} ${lx.toFixed(2)} ${ly.toFixed(2)})` }))

    link.addEventListener('click', (e) => { e.preventDefault(); setActive(idx, true) })
    link.addEventListener('keydown', (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(idx, true) } })
    labelsEl.value!.appendChild(link)
    labelLinkEls.push(link)
  })
}

watch(activeIdx, (i) => {
  labelLinkEls.forEach((a, k) => a.classList.toggle('active', k === i))
})

function getAngle(el: Element) {
  const t = window.getComputedStyle(el).transform
  if (!t || t === 'none') return 0
  try { const m = new DOMMatrix(t); return Math.atan2(m.b, m.a) * 180 / Math.PI } catch { return 0 }
}
function onPortraitEnter() {
  if (!ringsEl.value) return
  const c = getAngle(ringsEl.value)
  ringsEl.value.style.transition = 'none'
  ringsEl.value.classList.add('rings-aligned')
  ringsEl.value.style.transform = `rotate(${c}deg) scale(1.1)`
  void ringsEl.value.getBoundingClientRect()
  ringsEl.value.style.transition = 'transform .9s cubic-bezier(.34,1.56,.64,1)'
  ringsEl.value.style.transform = 'rotate(0deg) scale(1.15)'
}
function onPortraitLeave() {
  if (!ringsEl.value) return
  const c = getAngle(ringsEl.value)
  ringsEl.value.style.transition = 'transform .5s ease-out'
  ringsEl.value.style.transform = `rotate(${c}deg) scale(1)`
  setTimeout(() => { if (ringsEl.value) { ringsEl.value.style.transition = ''; ringsEl.value.style.transform = ''; ringsEl.value.classList.remove('rings-aligned') } }, 520)
}

function onWrapClick() {
  if (props.centerMode) emit('exitCenter')
}

onMounted(() => {
  buildKeyboard()
  buildWheel()
  setActive(0)
})
</script>

<style scoped>
.laptop-wrap {
  width: 100%;
  max-width: 1400px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 0;
  flex: 1 1 auto;
  contain: layout paint;
  transition: transform .75s cubic-bezier(.34, 1.25, .64, 1), max-width .75s ease, opacity .4s ease;
  transform-origin: top right;
}

.laptop-svg {
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: visible;
  display: block;
  animation: laptop-float 7s ease-in-out infinite;
  transform-origin: 50% 50%;
  transition: filter .4s ease;
  will-change: transform;
}

@keyframes laptop-float {

  0%,
  100% {
    transform: translateY(0) rotate(-.2deg);
  }

  50% {
    transform: translateY(-8px) rotate(.25deg);
  }
}

.laptop-wrap:hover .laptop-svg {
  animation: laptop-shake .55s cubic-bezier(.36, .07, .19, .97) 1;
  filter: drop-shadow(0 12px 30px rgba(188, 140, 255, .2));
}

@keyframes laptop-shake {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }

  15% {
    transform: translate(-2px, -1px) rotate(-.45deg);
  }

  30% {
    transform: translate(2px, 1px) rotate(.4deg);
  }

  45% {
    transform: translate(-1.5px, 1px) rotate(-.3deg);
  }

  60% {
    transform: translate(1.5px, -1px) rotate(.25deg);
  }

  75% {
    transform: translate(-1px, 0) rotate(-.15deg);
  }

  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}

/* Face anims */
:global(.eye) {
  animation: blink 5.5s ease-in-out infinite;
}

:global(.eye.right) {
  animation-delay: .05s;
}

@keyframes blink {

  0%,
  92%,
  96%,
  100% {
    opacity: 1;
  }

  94% {
    opacity: .05;
  }
}

:global(.mouth) {
  animation: mouth-wiggle 6s ease-in-out infinite;
  transform-origin: 550px 392px;
  transform-box: view-box;
}

@keyframes mouth-wiggle {

  0%,
  100% {
    transform: scaleX(1) rotate(0);
  }

  40% {
    transform: scaleX(1.05) rotate(-1deg);
  }

  70% {
    transform: scaleX(.95) rotate(1deg);
  }
}

:global(.screen-glow) {
  animation: screen-pulse 4.5s ease-in-out infinite;
}

@keyframes screen-pulse {

  0%,
  100% {
    opacity: .25;
  }

  50% {
    opacity: .55;
  }
}

:global(.power-led) {
  animation: led-blink 2.4s ease-in-out infinite;
  transform-origin: center;
  transform-box: fill-box;
}

@keyframes led-blink {

  0%,
  80%,
  100% {
    fill: #3fb950;
    filter: drop-shadow(0 0 4px #3fb950);
  }

  90% {
    fill: #1f3d25;
  }
}

/* Doodles */
:global(.doodle-star) {
  animation: doodle-spin 18s linear infinite, doodle-twinkle 2.2s ease-in-out infinite;
  transform-origin: 70px 188px;
  transform-box: view-box;
}

:global(.doodle-sq) {
  animation: doodle-float 6s ease-in-out infinite;
  transform-origin: 1010px 130px;
  transform-box: view-box;
}

:global(.doodle-dots) {
  animation: doodle-twinkle 2.6s ease-in-out infinite;
}

:global(.doodle-ast) {
  animation: doodle-spin 24s linear infinite reverse;
  transform-origin: 1020px 715px;
  transform-box: view-box;
}

:global(.doodle-spiral) {
  animation: doodle-spin 30s linear infinite;
  transform-origin: 1018px 412px;
  transform-box: view-box;
}

@keyframes doodle-spin {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes doodle-twinkle {

  0%,
  100% {
    opacity: .7;
  }

  50% {
    opacity: .25;
  }
}

@keyframes doodle-float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
}

/* Rings */
:global(.rings) {
  animation: ring-spin 90s linear infinite;
  transform-origin: 550px 360px;
  transform-box: view-box;
  will-change: transform;
}

:global(.rings.rings-aligned) {
  animation: none;
}

@keyframes ring-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

/* Portrait/Face hover */
:global(.portrait .face),
:global(.portrait .arrows),
:global(.portrait .face *) {
  transition: transform .55s cubic-bezier(.34, 1.56, .64, 1);
  transform-origin: 550px 360px;
  transform-box: view-box;
}

:global(.portrait .face) {
  transition-delay: .02s;
}

:global(.portrait .arrows) {
  transition-delay: .14s;
}

/* Labels */
:global(.svg-labels) {
  font-family: 'Caveat', cursive;
  font-weight: 700;
  letter-spacing: .5px;
}

:global(.svg-labels a) {
  cursor: pointer;
}

:global(.svg-labels a text) {
  transition: transform .45s cubic-bezier(.34, 1.56, .64, 1), filter .35s;
}

:global(.svg-labels a:hover text) {
  transform: scale(1.15) translateY(-2px);
  transform-origin: center;
  transform-box: fill-box;
}

:global(.svg-labels a:hover .lbl-underline) {
  opacity: 1;
  stroke-width: 3;
}

:global(.svg-labels a.active text) {
  filter: brightness(1.45) drop-shadow(0 0 14px currentColor);
  animation: active-label-pulse 2.2s ease-in-out infinite;
  transform: scale(1.2) translateY(-2px);
  transform-origin: center;
  transform-box: fill-box;
}

@keyframes active-label-pulse {

  0%,
  100% {
    filter: brightness(1.45) drop-shadow(0 0 14px currentColor);
  }

  50% {
    filter: brightness(1.7) drop-shadow(0 0 24px currentColor);
  }
}

:global(.svg-labels a.active .lbl-underline) {
  stroke-width: 4;
  opacity: 1;
}

:global(.lbl-halo) {
  opacity: 0;
  transition: opacity .45s ease;
  pointer-events: none;
}

:global(.svg-labels a.active .lbl-halo) {
  opacity: 1;
  animation: halo-pulse 2.6s ease-in-out infinite;
}

@keyframes halo-pulse {

  0%,
  100% {
    transform: scale(1);
    opacity: .85;
  }

  50% {
    transform: scale(1.08);
    opacity: 1;
  }
}

@media (min-width: 821px) {
  .laptop-wrap {
    flex: 1 1 auto;
    max-width: none;
    max-height: none;
    min-height: 0;
    padding: 0 8px;
  }

  .laptop-svg {
    width: 100%;
    height: 100%;
    max-height: 100%;
    max-width: 100%;
  }
}

@media (max-width: 820px) {
  .laptop-wrap {
    flex: 0 0 auto;
    margin-top: 4px;
  }

  :global(#labels) {
    transform: scale(1.35);
    transform-origin: 550px 360px;
    transform-box: view-box;
  }
}

@media (max-width: 480px) {
  :global(#labels) {
    transform: scale(1.55);
    transform-origin: 550px 360px;
    transform-box: view-box;
  }
}
</style>
