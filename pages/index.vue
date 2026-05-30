<template>
  <!-- SR accessible content -->
  <div class="sr-only" aria-hidden="false">
    <h1>Thuso Mokopotsa — Senior Frontend Developer</h1>
    <p>5+ years building real-time web apps, PWAs, and hybrid mobile products. Vue.js, React, TypeScript, WebRTC. Johannesburg, open to remote.</p>
    <p>Email: <a href="mailto:hello@thuso.dev">hello@thuso.dev</a></p>
    <p><a href="https://cal.com/thuso">Book a call with Thuso</a></p>
  </div>

  <main class="scene" role="main">
    <HeroTitle />
    <LaptopSvg :center-mode="centerMode" @exit-center="exitCenter" />
    <CaptionCarousel />
  </main>

  <!-- Home button (center mode only) -->
  <button v-if="centerMode" class="home-btn" type="button" aria-label="back to home" @click="exitCenter">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 11 L12 3 L21 11"/><path d="M5 10 L5 20 L19 20 L19 10"/><path d="M10 20 L10 14 L14 14 L14 20"/>
    </svg>
  </button>

  <ProjectsWidget ref="projectsWidget" @enter-center="enterCenter" />
  <SideCtas ref="sideCtas" />
  <DevTimeClock />
  <HireModal />
  <BabyAgent />
</template>

<script setup lang="ts">
const centerMode = ref(false)
const projectsWidget = ref<InstanceType<typeof import('~/components/ProjectsWidget.vue').default> | null>(null)
const sideCtas = ref<InstanceType<typeof import('~/components/SideCtas.vue').default> | null>(null)

function enterCenter() {
  if (window.matchMedia('(max-width: 820px)').matches) return
  centerMode.value = true
  document.body.classList.add('center-mode')
  nextTick(() => syncLayout())
}
function exitCenter() {
  centerMode.value = false
  document.body.classList.remove('center-mode')
  nextTick(() => syncLayout())
}

function syncLayout() {
  if (window.matchMedia('(max-width: 820px)').matches) return

  const pw = document.querySelector('.pw-widget') as HTMLElement | null
  const sc = document.querySelector('.side-ctas') as HTMLElement | null
  const dt = document.querySelector('.dt-widget') as HTMLElement | null
  const lc = document.querySelector('.left-ctas') as HTMLElement | null
  const cs = document.querySelector('.cap-stage') as HTMLElement | null

  if (centerMode.value) {
    if (sc) sc.style.top = ''
    if (pw) pw.style.maxHeight = ''
    if (cs) {
      const r = cs.getBoundingClientRect()
      document.documentElement.style.setProperty('--cta-top', Math.max(20, r.bottom + 12) + 'px')
    }
    syncLeft(dt, lc)
    return
  }

  if (!pw || !sc) return
  const vh = window.innerHeight
  const pwTop = pw.getBoundingClientRect().top
  const gap = 14
  const ctaH = sc.offsetHeight || 120
  const floor = vh - 100

  pw.style.maxHeight = Math.max(220, floor - pwTop - gap - ctaH) + 'px'
  const pwBot = pw.getBoundingClientRect().bottom
  const want = pwBot + gap
  const maxTop = floor - ctaH
  sc.style.top = Math.min(want, maxTop) + 'px'
  document.documentElement.style.setProperty('--cta-top', Math.min(want, maxTop) + 'px')

  syncLeft(dt, lc)
}

function syncLeft(dt: HTMLElement | null, lc: HTMLElement | null) {
  if (!dt || !lc) return
  const gap = 28
  const lctaH = lc.offsetHeight || 60
  const floor = window.innerHeight - 20 - lctaH
  const dtTop = dt.getBoundingClientRect().top
  dt.style.maxHeight = Math.max(110, floor - dtTop - gap) + 'px'
  const dtBot = dt.getBoundingClientRect().bottom
  const top = Math.max(20, Math.min(dtBot + gap, floor))
  lc.style.top = top + 'px'
  document.documentElement.style.setProperty('--left-ctas-top', top + 'px')
}

onMounted(() => {
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && centerMode.value) exitCenter() })
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => syncLayout())
    document.querySelectorAll('.pw-widget,.side-ctas,.dt-widget,.left-ctas,.cap-stage').forEach(el => ro.observe(el))
  }
  window.addEventListener('resize', syncLayout)
  ;[60, 240, 800].forEach(t => setTimeout(syncLayout, t))
})
</script>

<style>
/* Center mode layout — applied to body */
body.center-mode { overflow: hidden; }
body.center-mode .scene { pointer-events: none; }
body.center-mode .scene > *:not(.laptop-wrap):not(.cap-stage) { opacity: 0; pointer-events: none; transition: opacity .4s ease; }

body.center-mode .laptop-wrap {
  pointer-events: auto; position: fixed; top: 14px; right: 20px; left: auto;
  width: 280px; height: 200px; max-width: 280px; z-index: 9997; padding: 0;
  background: linear-gradient(180deg,rgba(13,17,23,.92),rgba(1,4,9,.92));
  border: 1px dashed rgba(255,255,255,.12); border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,.4); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
}
body.center-mode .laptop-svg { max-height: 100%; }
body.center-mode .laptop-wrap:hover { cursor: pointer; }

body.center-mode .cap-stage {
  opacity: 1 !important; pointer-events: auto !important;
  position: fixed; top: calc(14px + 200px + 10px);
  right: 20px; left: auto; width: 280px; max-width: 280px;
  margin: 0; padding: 0; z-index: 9997;
}

body.center-mode .pw-widget {
  top: 50%; left: 50%; right: auto;
  width: min(640px, calc(100vw - 640px));
  max-height: calc(100vh - 40px);
  transform: translate(-50%,-50%);
  z-index: 10000;
  box-shadow: 0 20px 60px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.06) inset,0 0 80px rgba(63,185,80,.1);
}

body.center-mode .side-ctas {
  position: fixed; top: var(--cta-top,360px); right: 20px; left: auto; bottom: auto;
  transform: none; flex-direction: column; gap: 10px;
  background: none; padding: 0; border: 0; backdrop-filter: none;
  width: 280px; z-index: 9998;
}
body.center-mode .side-ctas .cta { width: 100%; justify-content: center; }

/* Scene */
.scene {
  position: relative; z-index: 1; min-height: 100vh;
  padding: 14px 24px 18px;
  display: flex; flex-direction: column; align-items: center; gap: 6px;
}

/* Home button */
.home-btn {
  position: fixed; top: 18px; left: 50%; transform: translateX(-50%);
  z-index: 10002; width: 46px; height: 46px; border-radius: 50%; border: 0; padding: 0;
  background: linear-gradient(145deg,rgba(63,185,80,.35),rgba(57,212,192,.35));
  color: var(--chalk); cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 18px rgba(63,185,80,.3),inset 0 0 0 1px rgba(255,255,255,.15);
  transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .3s;
  animation: home-pulse 3s ease-in-out infinite;
}
@keyframes home-pulse { 0%,100% { box-shadow: 0 6px 18px rgba(63,185,80,.25); } 50% { box-shadow: 0 10px 26px rgba(63,185,80,.5); } }
.home-btn:hover { transform: translateX(-50%) scale(1.12) rotate(-4deg); }
.home-btn svg { width: 22px; height: 22px; }

@media (min-width: 821px) {
  body { overflow: hidden; }
  .scene {
    height: 100vh; max-height: 100vh; overflow: hidden;
    padding: 8px 24px 12px;
    padding-left: calc(var(--dt-width) + 48px);
    padding-right: calc(var(--pw-width) + 48px);
    gap: 2px;
  }
}

@media (max-width: 820px) {
  body { overflow: auto; }
  .scene { min-height: auto; padding: 15px 16px 25px; gap: 10px; }
  body.center-mode { overflow: auto; }
  body.center-mode .scene { pointer-events: auto; }
  body.center-mode .scene > * { opacity: 1 !important; pointer-events: auto !important; }
  body.center-mode .laptop-wrap { position: static; width: auto; height: auto; max-width: 100%; transform: none; background: none; border: 0; box-shadow: none; padding: 0; }
  body.center-mode .cap-stage { position: static; width: auto; max-width: 100%; }
  body.center-mode .pw-widget { position: static; transform: none; width: min(520px,calc(100vw - 24px)); max-height: none; }
  body.center-mode .side-ctas { position: static; transform: none; flex-direction: column; }
  body.center-mode .home-btn { display: none; }
}
</style>
