<template>
  <div class="hero-wrap">
    <h1 class="hero-title">Thuso</h1>
    <p class="hero-subtitle">
      <span class="c">// </span>About me
      <span class="c"> · </span>is drawn in a laptop
      <span class="pointer">↔</span>
      <span class="c"> drag or tap a label</span>
    </p>
  </div>
</template>

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

  0%,
  100% {
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

.hero-subtitle {
  font-family: 'Caveat', cursive;
  font-size: clamp(1.4rem, 1.6vw, 1.5rem);
  color: var(--dim);
  letter-spacing: .5px;
  margin: 0;
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

  0%,
  100% {
    transform: translateY(0);
    opacity: .6;
  }

  50% {
    transform: translateY(-3px);
    opacity: 1;
  }
}

@media (min-width: 821px) {
  .hero-title {
    font-size: clamp(1.75rem, 3.4vw, 2.8rem);
    margin: 0;
  }

  .hero-subtitle {
    font-size: clamp(.82rem, 1.05vw, 1rem);
    margin: 0 0 2px;
  }
}
</style>
