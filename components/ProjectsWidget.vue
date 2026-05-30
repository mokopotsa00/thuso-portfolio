<template>
  <section class="pw-widget" ref="widgetEl" aria-label="Latest projects">
    <div class="pw-header">
      <div class="pw-title-wrap">
        <span class="pw-title">latest projects</span>
        <span class="pw-sub">things I've shipped</span>
      </div>
      <span class="pw-count-pill">{{ PROJECTS.length }}</span>
    </div>

    <div class="pw-body" ref="bodyEl">
      <div class="pw-list">
        <article
          v-for="(p, i) in PROJECTS"
          :key="p.title"
          class="pw-card"
          :class="{ expanded: expandedIdx === i }"
          :style="{ '--accent': p.accent }"
          @click="toggleCard(i, $event)"
        >
          <div class="pw-card-head">
            <div class="pw-card-title">{{ p.title }}</div>
            <div class="pw-card-year">{{ p.year }}</div>
          </div>
          <div class="pw-card-desc">{{ p.short }}</div>
          <div class="pw-card-tags">
            <span v-for="t in p.tags" :key="t" class="pw-tag">{{ t }}</span>
          </div>
          <div class="pw-card-detail">
            <div class="pw-preview" aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none" :stroke="p.accent" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="6" y="10" width="52" height="36" rx="4"/>
                <path d="M10 20 H54"/>
                <circle cx="14" cy="15" r="1.5" :fill="p.accent"/>
                <circle cx="19" cy="15" r="1.5" :fill="p.accent"/>
                <path d="M14 28 L20 34 L14 40"/><path d="M26 40 H40"/><path d="M20 54 L44 54"/>
              </svg>
              <span class="pw-preview-label">{{ p.title }}</span>
            </div>
            <p class="pw-detail-body">{{ p.full }}</p>
            <div class="pw-detail-actions">
              <a v-if="p.demo" class="pw-btn pw-btn-demo" :href="p.demo" target="_blank" rel="noopener" @click.stop>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 3 H21 V10"/><path d="M10 14 L21 3"/><path d="M21 14 V21 H3 V3 H10"/>
                </svg>
                View project
              </a>
              <span v-else class="pw-btn pw-btn-disabled">Proprietary</span>
              <button class="pw-btn" type="button" @click.stop="expandedIdx = -1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 6 L18 18 M18 6 L6 18"/>
                </svg>
                close
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>

    <div class="pw-footer" :class="{ show: showFooter }">
      <button class="pw-view-more" type="button" @click="$emit('enterCenter')">
        <span>view all ({{ PROJECTS.length }})</span>
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M5 12 H19 M13 6 L19 12 L13 18" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PROJECTS } from '~/data/index'

defineEmits<{ (e: 'enterCenter'): void }>()
defineExpose({ widgetEl: null as HTMLElement | null })

const widgetEl = ref<HTMLElement | null>(null)
const bodyEl = ref<HTMLElement | null>(null)
const expandedIdx = ref(-1)
const showFooter = ref(false)

function toggleCard(i: number, e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target.closest('.pw-btn') || target.closest('a')) return
  expandedIdx.value = expandedIdx.value === i ? -1 : i
  if (expandedIdx.value >= 0) {
    nextTick(() => {
      const card = widgetEl.value?.querySelector(`.pw-card:nth-child(${i + 1})`)
      card?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    })
  }
}

function checkOverflow() {
  if (!bodyEl.value) return
  showFooter.value = bodyEl.value.scrollHeight > bodyEl.value.clientHeight + 4
}

onMounted(() => {
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(checkOverflow)
    if (widgetEl.value) ro.observe(widgetEl.value)
    if (bodyEl.value) ro.observe(bodyEl.value)
  }
})
</script>

<style scoped>
.pw-widget {
  position: fixed; top: 20px; right: 20px;
  width: var(--pw-width); max-height: calc(100vh - 220px);
  background: linear-gradient(180deg,rgba(13,17,23,.96) 0%,rgba(1,4,9,.98) 100%);
  border: 1px solid #30363d; border-radius: 14px; color: var(--chalk);
  box-shadow: 0 10px 30px rgba(0,0,0,.5),0 0 0 1px rgba(255,255,255,.04) inset,0 0 40px rgba(63,185,80,.06);
  z-index: 9998; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  display: flex; flex-direction: column; overflow: hidden;
  transition: max-height .55s cubic-bezier(.22,1,.36,1), width .75s cubic-bezier(.34,1.25,.64,1), top .75s, right .75s, left .75s, transform .75s cubic-bezier(.34,1.25,.64,1);
}
.pw-header { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-bottom: 1px solid #21262d; background: linear-gradient(180deg,rgba(255,255,255,.025),transparent),radial-gradient(ellipse at top left,rgba(63,185,80,.08),transparent 60%); flex-shrink: 0; }
.pw-title-wrap { display: flex; flex-direction: column; flex: 1; min-width: 0; }
.pw-title { font-family: 'Permanent Marker',cursive; font-size: 1.1rem; letter-spacing: 1.2px; color: var(--c-green); text-shadow: 0 0 14px rgba(63,185,80,.35); text-transform: lowercase; line-height: 1; }
.pw-sub { font-family: 'Caveat',cursive; font-size: .9rem; color: var(--dim-2); margin-top: 2px; }
.pw-count-pill { font-family: 'SF Mono',monospace; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 10px; background: rgba(63,185,80,.12); border: 1px solid rgba(63,185,80,.4); color: var(--c-green); }
.pw-body { flex: 1 1 auto; overflow-y: auto; overflow-x: hidden; padding: 8px 10px; scrollbar-width: thin; scrollbar-color: #30363d transparent; }
.pw-body::-webkit-scrollbar { width: 6px; }
.pw-body::-webkit-scrollbar-thumb { background: #30363d; border-radius: 3px; }
.pw-list { display: flex; flex-direction: column; gap: 8px; }
.pw-card { position: relative; background: linear-gradient(135deg,rgba(255,255,255,.03),rgba(255,255,255,.01)); border: 1px dashed rgba(255,255,255,.12); border-radius: 10px; padding: 10px 12px; cursor: pointer; transition: transform .3s cubic-bezier(.34,1.56,.64,1), border-color .3s, background .3s; overflow: hidden; }
.pw-card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--accent,var(--c-green)); box-shadow: 0 0 10px var(--accent,var(--c-green)); opacity: .7; transition: opacity .3s, width .3s; }
.pw-card:hover { transform: translateY(-2px) rotate(-.3deg); border-color: rgba(255,255,255,.35); }
.pw-card:hover::before { opacity: 1; width: 5px; }
.pw-card.expanded { cursor: default; transform: none; border-color: var(--accent,var(--c-green)); background: linear-gradient(135deg,rgba(63,185,80,.06),rgba(255,255,255,.02)); }
.pw-card.expanded .pw-card-desc { -webkit-line-clamp: unset; display: block; }
.pw-card-head { display: flex; align-items: center; gap: 8px; justify-content: space-between; }
.pw-card-title { font-family: 'Caveat',cursive; font-weight: 700; font-size: 1.15rem; color: var(--chalk); line-height: 1.15; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.pw-card-year { font-family: 'SF Mono',monospace; font-size: 10px; color: var(--dim-2); flex-shrink: 0; }
.pw-card-desc { font-family: 'Caveat',cursive; font-size: .98rem; color: var(--dim); line-height: 1.3; margin-top: 3px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.pw-card-tags { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 6px; }
.pw-tag { font-family: 'SF Mono',monospace; font-size: 9.5px; letter-spacing: .5px; padding: 2px 6px; border-radius: 4px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); color: var(--dim); }
.pw-card-detail { max-height: 0; overflow: hidden; opacity: 0; transition: max-height .45s ease, opacity .35s ease, margin-top .35s ease; margin-top: 0; }
.pw-card.expanded .pw-card-detail { max-height: 520px; opacity: 1; margin-top: 10px; }
.pw-preview { width: 100%; height: 120px; border-radius: 8px; background: linear-gradient(135deg,rgba(188,140,255,.18),rgba(88,199,255,.12)); border: 1px dashed rgba(255,255,255,.15); display: flex; align-items: center; justify-content: center; position: relative; }
.pw-preview svg { width: 48%; height: 48%; opacity: .7; }
.pw-preview-label { position: absolute; bottom: 8px; right: 10px; font-size: .85rem; color: var(--dim-2); font-family: 'Caveat',cursive; }
.pw-detail-body { font-family: 'Caveat',cursive; font-size: 1.02rem; color: var(--chalk); line-height: 1.45; margin: 8px 0 0; }
.pw-detail-actions { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
.pw-btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 12px; border-radius: 999px; font-family: 'Caveat',cursive; font-weight: 700; font-size: .98rem; color: var(--chalk); text-decoration: none; border: 1px dashed rgba(255,255,255,.3); background: rgba(255,255,255,.03); cursor: pointer; transition: transform .3s cubic-bezier(.34,1.56,.64,1), background .3s; }
.pw-btn:hover { transform: translateY(-2px); background: rgba(255,255,255,.07); }
.pw-btn-demo { background: linear-gradient(135deg,rgba(188,140,255,.25),rgba(88,199,255,.22)); color: #fff; border-color: rgba(188,140,255,.5); }
.pw-btn-demo:hover { background: linear-gradient(135deg,rgba(188,140,255,.4),rgba(88,199,255,.35)); box-shadow: 0 6px 18px rgba(188,140,255,.3); }
.pw-btn-disabled { cursor: not-allowed; opacity: .55; pointer-events: none; }
.pw-btn svg { width: 14px; height: 14px; }
.pw-footer { flex-shrink: 0; padding: 10px 12px 12px; border-top: 1px dashed rgba(255,255,255,.1); display: none; }
.pw-footer.show { display: block; }
.pw-view-more { width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 9px 14px; border-radius: 10px; background: linear-gradient(135deg,rgba(63,185,80,.12),rgba(188,140,255,.12)); border: 1px dashed rgba(63,185,80,.45); color: var(--chalk); font-family: 'Caveat',cursive; font-weight: 700; font-size: 1.02rem; cursor: pointer; transition: transform .3s cubic-bezier(.34,1.56,.64,1), background .3s, box-shadow .3s; }
.pw-view-more:hover { transform: translateY(-2px); background: linear-gradient(135deg,rgba(63,185,80,.22),rgba(188,140,255,.22)); box-shadow: 0 8px 20px rgba(63,185,80,.25); }
.pw-view-more svg { width: 14px; height: 14px; }

@media (max-width: 820px) {
  .pw-widget { position: static; width: min(520px,calc(100vw - 24px)); max-height: none; margin: 14px auto 4px; backdrop-filter: none; background: #0d1117; }
  .pw-body { max-height: none; overflow-y: visible; }
  .pw-footer.show { display: none; }
}
@media (max-width: 480px) { .pw-widget { width: calc(100vw - 24px); } }
</style>
