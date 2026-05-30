<template>
  <div class="dt-widget" aria-label="Current time">
    <div class="dt-bar">
      <span class="dt-dot" aria-hidden="true"></span>
      <span class="dt-bar-label">thuso.dev</span>
      <span class="dt-live">LIVE</span>
    </div>
    <div class="dt-clock-body">
      <div class="dt-clock" aria-live="off">
        <span class="dt-hrs" :class="{ tick: hrsTick }">{{ hrs }}</span>
        <span class="dt-colon">:</span>
        <span class="dt-mins" :class="{ tick: minsTick }">{{ mins }}</span>
        <span class="dt-colon">:</span>
        <span class="dt-secs" :class="{ tick: secsTick }">{{ secs }}</span>
      </div>
      <div class="dt-date-line">{{ dateLine }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const pad = (n: number) => String(n).padStart(2, '0')

const hrs = ref('00')
const mins = ref('00')
const secs = ref('00')
const dateLine = ref('---')
const hrsTick = ref(false)
const minsTick = ref(false)
const secsTick = ref(false)

function flash(r: Ref<boolean>) {
  r.value = false
  nextTick(() => { r.value = true })
}

function tick() {
  const n = new Date()
  const h = pad(n.getHours()), m = pad(n.getMinutes()), s = pad(n.getSeconds())
  if (hrs.value !== h) { hrs.value = h; flash(hrsTick) }
  if (mins.value !== m) { mins.value = m; flash(minsTick) }
  secs.value = s; flash(secsTick)
  dateLine.value = `${DAYS[n.getDay()]} · ${n.getFullYear()}-${pad(n.getMonth()+1)}-${pad(n.getDate())}`
}

onMounted(() => { tick(); setInterval(tick, 1000) })
</script>

<style scoped>
.dt-widget {
  position: fixed; top: 20px; left: 20px;
  width: var(--dt-width);
  background: linear-gradient(180deg, rgba(13,17,23,.97) 0%, rgba(1,4,9,.99) 100%);
  border: 1px solid #30363d; border-radius: 12px;
  font-family: 'SF Mono','JetBrains Mono',Consolas,monospace;
  font-size: 12px; color: #c9d1d9;
  box-shadow: 0 10px 30px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.04) inset, 0 0 40px rgba(188,140,255,.06);
  overflow: hidden; z-index: 9999;
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  user-select: none;
}

.dt-bar {
  display: flex; align-items: center; gap: 6px;
  padding: 9px 12px 8px; border-bottom: 1px solid #21262d;
}
.dt-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #3fb950; box-shadow: 0 0 8px #3fb950;
  animation: dt-pulse 2s ease-in-out infinite; flex-shrink: 0;
}
@keyframes dt-pulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50% { opacity: .5; transform: scale(.85); }
}
.dt-bar-label { color: #6e7681; font-size: 10px; letter-spacing: .4px; flex: 1; }
.dt-live {
  font-size: 9px; color: #3fb950; padding: 1px 5px;
  border: 1px solid #238636; border-radius: 8px;
  background: rgba(63,185,80,.08); letter-spacing: .8px; font-weight: 600;
}
.dt-clock-body {
  padding: 10px 12px 13px;
  display: flex; flex-direction: column; align-items: center; gap: 5px;
}
.dt-clock {
  display: flex; align-items: baseline;
  font-feature-settings: "tnum"; letter-spacing: -1px; line-height: 1;
}
.dt-clock > span { display: inline-block; min-width: 2ch; text-align: center; }
.dt-hrs { font-size: 30px; font-weight: 700; color: #f0883e; text-shadow: 0 0 14px rgba(240,136,62,.45); transition: transform .35s ease; }
.dt-mins { font-size: 30px; font-weight: 700; color: #bc8cff; text-shadow: 0 0 14px rgba(188,140,255,.45); transition: transform .35s ease; }
.dt-secs { font-size: 20px; font-weight: 700; color: #3fb950; text-shadow: 0 0 12px rgba(63,185,80,.4); transition: transform .18s ease; align-self: flex-end; margin-bottom: 2px; }
.dt-colon { font-size: 28px; font-weight: 700; color: #30363d; min-width: .5ch !important; padding: 0 1px; animation: colon-blink 1s steps(2,jump-none) infinite; }
@keyframes colon-blink { 0%,50% { opacity: 1; } 50.01%,100% { opacity: .2; } }
.dt-hrs.tick { transform: scale(1.12); }
.dt-mins.tick { transform: scale(1.1); }
.dt-secs.tick { transform: scale(1.12); }
.dt-date-line { font-size: 10px; color: #6e7681; letter-spacing: .3px; text-align: center; }

@media (max-width: 820px) {
  .dt-widget {
    position: static; width: min(520px, calc(100vw - 24px));
    margin: 14px auto 12px; backdrop-filter: none; background: #0d1117;
  }
}
@media (max-width: 480px) { .dt-widget { width: calc(100vw - 24px); } }
</style>
