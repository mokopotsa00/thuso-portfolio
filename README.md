# thuso.dev — Nuxt 3 Portfolio

Hand-drawn portfolio. All animations, the spinning personality wheel, baby agent, and projects widget — now in clean Vue components.

## Structure

```
├── app.vue                  # Root
├── pages/index.vue          # Main page + layout orchestration
├── components/
│   ├── HeroTitle.vue        # Gradient title + subtitle
│   ├── LaptopSvg.vue        # SVG laptop + personality wheel (dynamic)
│   ├── CaptionCarousel.vue  # Draggable slide carousel
│   ├── DevTimeClock.vue     # Compact live clock (left sidebar)
│   ├── ProjectsWidget.vue   # Expandable project cards (right sidebar)
│   ├── SideCtas.vue         # Coffee + meeting CTAs
│   ├── HireModal.vue        # "Hire me" button + inquiry modal
│   └── BabyAgent.vue        # Cute chat button (bottom right)
├── composables/
│   └── useActiveSegment.ts  # Shared state: active wheel segment
├── data/index.ts            # Segments + projects data
└── assets/css/global.css   # Design tokens + shared styles
```

## Dev

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # Static export → deploy to Vercel/Netlify
npm run build      # SSR build
```

## Deploy

Push to GitHub → connect to Vercel. Set output to `dist` if using `generate`.

## Update content

- **Wheel labels / descriptions** → `data/index.ts` → `SEGMENTS`
- **Projects** → `data/index.ts` → `PROJECTS`
- **Contact links** → search `cal.com/thuso` and `hello@thuso.dev`
- **Buy me a coffee** → `SideCtas.vue` → update `buymeacoffee.com/thuso`
