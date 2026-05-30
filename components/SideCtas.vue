<template>
  <div class="side-ctas" ref="el">
    <a class="cta cta-coffee" href="https://www.buymeacoffee.com/thuso" target="_blank" rel="noopener">
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path class="steam s1" d="M 10 4 Q 12 6 10 8"/>
        <path class="steam s2" d="M 16 3 Q 18 5 16 7"/>
        <path class="steam s3" d="M 22 4 Q 24 6 22 8"/>
        <path d="M 6 12 L 26 12 L 24 24 Q 24 28 20 28 L 12 28 Q 8 28 8 24 Z" fill="rgba(240,136,62,0.15)"/>
        <path d="M 26 15 L 30 15 Q 32 15 32 18 L 32 20 Q 32 23 30 23 L 26 23"/>
      </svg>
      <span>Buy me a coffee</span>
    </a>
    <a class="cta cta-meeting" href="https://cal.com/thuso" target="_blank" rel="noopener">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="5" width="18" height="16" rx="2" fill="rgba(88,199,255,0.1)"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <line x1="8" y1="3" x2="8" y2="7"/>
        <line x1="16" y1="3" x2="16" y2="7"/>
        <circle cx="8" cy="15" r="1.3" fill="currentColor" style="animation: meet-dot-pulse 1.6s ease-in-out infinite;"/>
        <circle cx="12" cy="15" r="1.3" fill="currentColor" style="animation: meet-dot-pulse 1.6s ease-in-out infinite; animation-delay:.2s"/>
        <circle cx="16" cy="15" r="1.3" fill="currentColor" style="animation: meet-dot-pulse 1.6s ease-in-out infinite; animation-delay:.4s"/>
      </svg>
      <span>Book a meeting</span>
    </a>
  </div>
</template>

<script setup lang="ts">
const el = ref<HTMLElement | null>(null)
defineExpose({ el })
</script>

<style scoped>
.side-ctas {
  position: fixed; right: 20px; top: calc(var(--cta-top, 420px));
  display: flex; flex-direction: column; gap: 12px;
  z-index: 9997; align-items: flex-end;
  transition: top .5s cubic-bezier(.22,1,.36,1);
}
.cta { width: var(--pw-width); }

.cta-coffee { background: linear-gradient(135deg,rgba(240,136,62,.25),rgba(255,122,182,.22)); box-shadow: 0 6px 24px rgba(240,136,62,.15); animation: coffee-breathe 5s ease-in-out infinite; }
.cta-coffee:hover { background: linear-gradient(135deg,rgba(240,136,62,.4),rgba(255,122,182,.35)); box-shadow: 0 14px 36px rgba(240,136,62,.4); }
@keyframes coffee-breathe { 0%,100% { box-shadow: 0 6px 24px rgba(240,136,62,.15); } 50% { box-shadow: 0 10px 30px rgba(255,122,182,.25); } }
.cta-coffee svg { color: var(--c-orange); }

.steam { animation: steam-rise 2.4s ease-in-out infinite; transform-origin: center bottom; }
.steam.s2 { animation-delay: .8s; } .steam.s3 { animation-delay: 1.4s; }
@keyframes steam-rise { 0% { opacity: 0; transform: translateY(4px) scale(.8); } 30% { opacity: .9; } 100% { opacity: 0; transform: translateY(-6px) scale(1.1); } }

.cta-meeting { background: linear-gradient(135deg,rgba(188,140,255,.25),rgba(88,199,255,.22)); box-shadow: 0 6px 24px rgba(188,140,255,.15); animation: meet-breathe 4.5s ease-in-out infinite; }
.cta-meeting:hover { background: linear-gradient(135deg,rgba(188,140,255,.4),rgba(88,199,255,.35)); box-shadow: 0 14px 36px rgba(88,199,255,.4); }
@keyframes meet-breathe { 0%,100% { box-shadow: 0 6px 24px rgba(188,140,255,.15); } 50% { box-shadow: 0 10px 30px rgba(88,199,255,.28); } }
.cta-meeting svg { color: var(--c-cyan); }
@keyframes meet-dot-pulse { 0%,100% { opacity: 1; } 50% { opacity: .4; } }

@media (max-width: 820px) {
  .side-ctas { position: static; transform: none; top: auto; right: auto; flex-direction: column; align-items: center; margin: 10px auto 0; gap: 14px; }
  .cta { width: auto; font-size: 1.08rem; padding: 11px 18px; }
}
</style>
