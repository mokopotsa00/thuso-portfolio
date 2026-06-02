<template>
  <div class="hero-wrap">
    <h1 class="hero-title">Thuso</h1>
    <p class="hero-role">
      <span class="role-name">Thuso Mokopotsa</span>
      <span class="role-sep"> · </span>
      <span class="role-title">Senior Frontend Developer</span>
      <span v-if="openToWork" class="otw-badge">
        <span class="otw-dot"></span>Open to work
      </span>
    </p>
    <p class="hero-subtitle">
      <span class="c">// </span>About me
      <span class="c"> · </span>is drawn in a laptop
      <span class="pointer">↔</span>
      <span class="c"> drag or tap a label</span>
    </p>
  </div>
</template>

<script setup lang="ts">
// ── Toggle this to show/hide the "Open to work" signal ──
const openToWork = ref(true)
</script>

<style scoped>
.hero-wrap {
  display: contents;
}

.hero-title {
  font-family: 'Permanent Marker', cursive;
  font-size: clamp(2rem, 5.2vw, 4rem);
  line-height: .95;
  letter-spacing: 2px;
  margin: 0;
  text-align: center;
  background: linear-gradient(92deg, var(--c-pink) 0%, var(--c-purple) 28%, var(--c-cyan) 52%, var(--c-green) 74%, var(--c-yellow) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transform: rotate(-1.3deg);
  filter: drop-shadow(0 0 24px rgba(188, 140, 255, .25));
  max-width: 90%;
  animation: title-breathe 7s ease-in-out infinite;
}

@keyframes title-breathe {
  0%, 100% {
    filter: drop-shadow(0 0 22px rgba(188, 140, 255, .22));
    transform: rotate(-1.3deg);
  }
  50% {
    filter: drop-shadow(0 0 34px rgba(240, 136, 62, .35));
    transform: rotate(-1deg) translateY(-2px);
  }
}

.hero-title::after {
  content: '';
  display: block;
  height: 8px;
  margin: 3px auto 0;
  width: 62%;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 10' preserveAspectRatio='none'><path d='M3 6 Q 20 -1 40 6 T 80 6 T 120 6 T 160 6 T 200 6 T 240 6 T 280 6 T 317 6' fill='none' stroke='%23f5c518' stroke-width='3' stroke-linecap='round'/></svg>");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  opacity: .85;
}

/* NEW: readable role line for recruiters */
.hero-role {
  font-family: 'Caveat', cursive;
  font-size: clamp(1.1rem, 1.8vw, 1.35rem);
  color: var(--chalk);
  margin: 4px 0 0;
  text-align: center;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
  opacity: 0.92;
}

.role-name {
  font-weight: 700;
  color: var(--chalk);
}

.role-sep {
  color: var(--dim-2);
}

.role-title {
  color: var(--c-cyan);
}

.otw-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(63, 185, 80, 0.15);
  border: 1px dashed rgba(63, 185, 80, 0.5);
  border-radius: 999px;
  padding: 1px 10px 1px 7px;
  font-size: .85em;
  color: var(--c-green);
  margin-left: 4px;
}

.otw-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--c-green);
  box-shadow: 0 0 8px var(--c-green);
  animation: otw-pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes otw-pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--c-green); }
  50% { opacity: .5; box-shadow: 0 0 16px var(--c-green); }
}

.hero-subtitle {
  font-family: 'Caveat', cursive;
  font-size: clamp(1.1rem, 1.4vw, 1.25rem);
  color: var(--dim);
  letter-spacing: .5px;
  margin: 2px 0 0;
  transform: rotate(-.4deg);
}

.hero-subtitle .c {
  color: var(--dim-2);
}

.hero-subtitle .pointer {
  display: inline-block;
  color: var(--c-yellow);
  animation: tap-hint 1.8s ease-in-out infinite;
}

@keyframes tap-hint {
  0%, 100% { transform: translateY(0); opacity: .6; }
  50% { transform: translateY(-3px); opacity: 1; }
}

@media (min-width: 821px) {
  .hero-title {
    font-size: clamp(1.75rem, 3.4vw, 2.8rem);
    margin: 0;
  }
  .hero-role {
    font-size: clamp(.9rem, 1.1vw, 1.05rem);
    margin: 2px 0 0;
  }
  .hero-subtitle {
    font-size: clamp(.82rem, 1.05vw, 1rem);
    margin: 0 0 2px;
  }
}
</style>
