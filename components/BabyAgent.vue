<template>
  <div class="ai-agent" ref="agentEl">
    <span class="ai-btn-label">hi!</span>
    <button
      class="ai-btn"
      type="button"
      :aria-expanded="isOpen"
      aria-haspopup="dialog"
      aria-label="Say hi"
      @click.stop="toggle"
    >
      <div class="ai-face" aria-hidden="true">
        <span class="ai-cheek left"></span>
        <span class="ai-cheek right"></span>
        <span class="ai-eye left"></span>
        <span class="ai-eye right"></span>
        <span class="ai-mouth"></span>
      </div>
    </button>
    <div class="ai-popup" :class="{ show: isOpen }" role="dialog" aria-labelledby="aiPopupTitle">
      <button class="ai-popup-close" type="button" aria-label="close" @click.stop="isOpen = false">×</button>
      <div class="ai-popup-head">
        <span class="ai-dot"></span>
        <span id="aiPopupTitle">still learning…</span>
      </div>
      <p class="ai-popup-msg">Hi! I'm just a tiny baby chat — still learning all about Thuso.</p>
      <p class="ai-popup-sub">Want to chat with Thuso directly instead?</p>
      <a class="ai-popup-cta" href="https://cal.com/thuso" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        Schedule a quick call
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const agentEl = ref<HTMLElement | null>(null)

function toggle() { isOpen.value = !isOpen.value }

function onOutsideClick(e: MouseEvent) {
  if (!isOpen.value) return
  if (agentEl.value && !agentEl.value.contains(e.target as Node)) isOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', onOutsideClick)
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') isOpen.value = false })
})
onUnmounted(() => { document.removeEventListener('click', onOutsideClick) })
</script>

<style scoped>
.ai-agent { position: fixed; bottom: 20px; right: 20px; z-index: 10001; }
.ai-btn {
  width: 50px; height: 50px; border-radius: 50%; border: 0; padding: 0;
  background: radial-gradient(circle at 35% 30%,#f0fff8 0%,transparent 55%),linear-gradient(145deg,#cdf3e3 0%,#86dcc2 55%,#4fc4ac 100%);
  cursor: pointer; position: relative; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 18px rgba(57,212,192,.32),inset 0 -6px 12px rgba(40,160,140,.25),inset 0 3px 8px rgba(255,255,255,.55);
  animation: baby-float 3.6s ease-in-out infinite;
  transition: transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease;
  overflow: visible; will-change: transform;
}
.ai-btn::after { content: ''; position: absolute; top: -7px; right: 4px; width: 7px; height: 7px; border-radius: 50%; background: #fff5c4; box-shadow: 0 0 8px rgba(255,210,130,.9),0 0 0 2px rgba(255,255,255,.55); animation: baby-sparkle 2.4s ease-in-out infinite; pointer-events: none; }
.ai-btn:hover { transform: scale(1.1) rotate(3deg); box-shadow: 0 10px 24px rgba(57,212,192,.5),inset 0 -6px 14px rgba(40,160,140,.3),inset 0 3px 10px rgba(255,255,255,.65); }
.ai-btn:hover .ai-face { animation: baby-wiggle .7s ease-in-out; }
@keyframes baby-float { 0%,100% { transform: translateY(0) rotate(-1.5deg); } 50% { transform: translateY(-3px) rotate(2deg); } }
@keyframes baby-sparkle { 0%,100% { opacity: .65; transform: scale(.9); } 50% { opacity: 1; transform: scale(1.15) translateY(-2px); } }
@keyframes baby-wiggle { 0%,100% { transform: rotate(0); } 25% { transform: rotate(-6deg); } 75% { transform: rotate(6deg); } }

.ai-face { width: 34px; height: 30px; position: relative; }
.ai-eye { position: absolute; width: 7.5px; height: 7.5px; border-radius: 50%; background: #1d2a26; top: 7px; animation: baby-blink 5.5s ease-in-out infinite; }
.ai-eye::after { content: ''; position: absolute; top: 1px; left: 1.5px; width: 2.5px; height: 2.5px; border-radius: 50%; background: #fff; }
.ai-eye.left { left: 4px; } .ai-eye.right { right: 4px; }
@keyframes baby-blink { 0%,92%,100% { height: 7.5px; top: 7px; } 95% { height: 1.2px; top: 10.5px; } }
.ai-mouth { position: absolute; bottom: 4px; left: 50%; width: 9px; height: 5px; margin-left: -4.5px; border: 1.8px solid #1d2a26; border-top: 0; border-radius: 0 0 10px 10px; background: #f99f7c; }
.ai-cheek { position: absolute; width: 5px; height: 5px; border-radius: 50%; background: rgba(255,150,110,.55); filter: blur(1px); bottom: 7px; pointer-events: none; }
.ai-cheek.left { left: 1px; } .ai-cheek.right { right: 1px; }

.ai-btn-label { position: absolute; right: 60px; top: 50%; transform: translateY(-50%) translateX(8px); font-family: 'Caveat',cursive; font-size: 1rem; color: #b5ebdc; text-shadow: 0 0 10px rgba(57,212,192,.5); white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity .4s ease, transform .4s cubic-bezier(.34,1.56,.64,1); }
.ai-agent:hover .ai-btn-label { opacity: .95; transform: translateY(-50%) translateX(0); }

.ai-popup { position: absolute; bottom: 66px; right: 0; width: 290px; padding: 14px 16px 12px; background: linear-gradient(180deg,#fdfaf0 0%,#f2f8ee 100%); border: 1px solid rgba(57,212,192,.5); border-radius: 18px; box-shadow: 0 12px 32px rgba(57,212,192,.22),0 0 0 1px rgba(255,255,255,.5) inset; opacity: 0; transform: translateY(10px) scale(.96); pointer-events: none; transition: opacity .35s ease, transform .45s cubic-bezier(.34,1.56,.64,1); color: #223330; }
.ai-popup.show { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
.ai-popup::after { content: ''; position: absolute; bottom: -9px; right: 22px; width: 15px; height: 15px; background: #f2f8ee; border-right: 1px solid rgba(57,212,192,.5); border-bottom: 1px solid rgba(57,212,192,.5); transform: rotate(45deg); border-radius: 0 0 5px 0; }
.ai-popup-head { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; font-family: 'Caveat',cursive; font-size: .95rem; color: #2a8a7a; }
.ai-dot { width: 8px; height: 8px; border-radius: 50%; background: #39d4c0; box-shadow: 0 0 10px rgba(57,212,192,.8); animation: dot-breath 1.8s ease-in-out infinite; }
@keyframes dot-breath { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: .55; transform: scale(.8); } }
.ai-popup-msg { font-family: 'Caveat',cursive; font-size: 1.22rem; line-height: 1.35; color: #223330; margin: 0 0 4px; }
.ai-popup-sub { font-family: 'Caveat',cursive; font-size: .98rem; color: #60766e; margin: 0 0 12px; }
.ai-popup-cta { display: inline-flex; align-items: center; gap: 8px; padding: 9px 14px; border-radius: 999px; background: linear-gradient(135deg,#7fe3cc,#a8e6b8); border: 1px solid rgba(255,255,255,.55); color: #0d3a32; text-decoration: none; font-family: 'Caveat',cursive; font-weight: 700; font-size: 1.06rem; transition: transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s; box-shadow: 0 4px 16px rgba(57,212,192,.3); }
.ai-popup-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(57,212,192,.45); }
.ai-popup-cta svg { width: 14px; height: 14px; }
.ai-popup-close { position: absolute; top: 8px; right: 10px; background: transparent; border: 0; color: #8faaa3; cursor: pointer; font-size: 18px; line-height: 1; padding: 2px 6px; border-radius: 6px; transition: color .2s, background .2s; }
.ai-popup-close:hover { color: #223330; background: rgba(57,212,192,.15); }

@media (max-width: 820px) { .ai-agent { bottom: 16px; right: 16px; } .ai-popup { width: 280px; bottom: 60px; backdrop-filter: none; } }
</style>
