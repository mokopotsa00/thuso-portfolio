<template>
  <div class="cap-stage">
    <div class="cap-viewport"
      :class="{ grabbing: isDragging }"
      ref="viewportEl"
      aria-roledescription="carousel"
      @mousedown="onDown"
      @touchstart.passive="onDown"
      @keydown="onKey"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false">
      <div class="cap-track"
        ref="trackEl"
        :style="trackStyle">
        <div v-for="(s, i) in SEGMENTS"
          :key="s.label"
          class="cap-slide"
          :data-idx="i">
          <span class="cap-label-tag"
            :style="{ color: s.c, textShadow: `0 0 18px ${s.c}66` }">{{ s.label }}</span>
          <span class="cap-desc">{{ s.desc }}</span>
        </div>
      </div>
    </div>
    <div class="cap-dots">
      <button v-for="(s, i) in SEGMENTS"
        :key="s.label"
        type="button"
        class="cap-dot"
        :class="{ active: activeIdx === i }"
        :style="{ '--dot-c': s.c }"
        :aria-label="`show ${s.label}`"
        @click="setActive(i, true)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SEGMENTS } from '~/data/index'
import { useActiveSegment } from '~/composables/useActiveSegment'

const { activeIdx, setActive, isPaused } = useActiveSegment()

const viewportEl = ref<HTMLElement | null>(null)
const trackEl = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const hovering = ref(false)

const dragStartX = ref(0)
const dragDx = ref(0)
const trackStyle = computed(() => {
  if (isDragging.value) {
    return { transform: `translateX(calc(${-activeIdx.value * 100}% + ${dragDx.value}px))`, transition: 'none' }
  }
  return { transform: `translateX(${-activeIdx.value * 100}%)`, transition: 'transform .85s cubic-bezier(.22,1,.36,1)' }
})

const AUTO = 6500
let timer: ReturnType<typeof setInterval>

function startTimer() {
  timer = setInterval(() => {
    if (isPaused() || isDragging.value || hovering.value) return
    setActive(activeIdx.value + 1)
  }, AUTO)
}

function onDown(e: MouseEvent | TouchEvent) {
  isDragging.value = true
  dragStartX.value = 'touches' in e ? e.touches[0].clientX : e.clientX
  dragDx.value = 0
  setActive(activeIdx.value, true) // just pause
}
function onMove(e: MouseEvent | TouchEvent) {
  if (!isDragging.value) return
  const x = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX
  dragDx.value = x - dragStartX.value
}
function onUp() {
  if (!isDragging.value) return
  isDragging.value = false
  const threshold = (viewportEl.value?.clientWidth ?? 300) * 0.2
  let t = activeIdx.value
  if (dragDx.value < -threshold) t++
  else if (dragDx.value > threshold) t--
  dragDx.value = 0
  setActive(t, true)
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') { setActive(activeIdx.value - 1, true); e.preventDefault() }
  if (e.key === 'ArrowRight') { setActive(activeIdx.value + 1, true); e.preventDefault() }
}

onMounted(() => {
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
  window.addEventListener('touchmove', onMove, { passive: true })
  window.addEventListener('touchend', onUp)
  window.addEventListener('touchcancel', onUp)
  startTimer()
})
onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseup', onUp)
  window.removeEventListener('touchmove', onMove)
  window.removeEventListener('touchend', onUp)
  window.removeEventListener('touchcancel', onUp)
  clearInterval(timer)
})
</script>

<style scoped>
.cap-stage {
  margin: 0 auto;
  max-width: 820px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 0 6px;
  flex: 0 0 auto;
}

.cap-viewport {
  width: 100%;
  overflow: hidden;
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .035), rgba(255, 255, 255, .012));
  border: 1px dashed rgba(255, 255, 255, .1);
  position: relative;
  touch-action: pan-y;
  cursor: grab;
  outline: none;
  transition: border-color .35s;
}

.cap-viewport.grabbing {
  cursor: grabbing;
}

.cap-viewport:focus-visible {
  border-color: rgba(188, 140, 255, .5);
}

.cap-viewport::before,
.cap-viewport::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 20px;
  pointer-events: none;
  z-index: 2;
}

.cap-viewport::before {
  left: 0;
  background: linear-gradient(90deg, rgba(10, 13, 19, .6), transparent);
}

.cap-viewport::after {
  right: 0;
  background: linear-gradient(-90deg, rgba(10, 13, 19, .6), transparent);
}

.cap-track {
  display: flex;
  will-change: transform;
}

.cap-slide {
  flex: 0 0 100%;
  padding: 14px 26px 16px;
  text-align: center;
  min-height: 88px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-family: 'Caveat', cursive;
  font-size: clamp(1.25rem, 1.6vw, 1.45rem);
  line-height: 1.35;
  color: var(--chalk);
  user-select: none;
}

.cap-label-tag {
  font-family: 'Permanent Marker', cursive;
  letter-spacing: 1.5px;
  text-transform: lowercase;
  font-size: 1.1em;
}

.cap-desc {
  max-width: 620px;
  font-size: 1em;
}

.cap-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 0 14px;
  max-width: 560px;
}

.cap-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 0;
  padding: 0;
  background: var(--dot-c, rgba(255, 255, 255, .3));
  opacity: .32;
  cursor: pointer;
  transition: opacity .35s ease, width .5s cubic-bezier(.34, 1.56, .64, 1), border-radius .5s, transform .3s;
}

.cap-dot:hover {
  opacity: .75;
  transform: scale(1.2);
}

.cap-dot.active {
  opacity: 1;
  width: 26px;
  border-radius: 4px;
}

@media (min-width: 821px) {
  .cap-stage {
    min-height: 68px;
    padding: 6px 26px 8px;
  }

  .cap-dots {
    margin: 2px auto 0;
  }
}

@media (max-width: 820px) {
  .cap-stage {
    font-size: 1.2rem;
  }

  .cap-label-tag {
    font-size: 1.2em;
  }

  .cap-desc {
    max-width: 92vw;
  }
}
</style>
