export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Thuso Mokopotsa — Senior Frontend Developer · Builder',
      meta: [
        { name: 'description', content: 'Thuso Mokopotsa — senior frontend developer. Vue.js, React, WebRTC, PWA. 5+ years shipping real-time web and mobile apps.' },
        { name: 'author', content: 'Thuso Mokopotsa' },
        { property: 'og:title', content: 'Thuso Mokopotsa — Senior Frontend Developer' },
        { property: 'og:url', content: 'https://thuso.dev/' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'theme-color', content: '#0a0d13' },
        { name: 'color-scheme', content: 'dark' },
      ],
      link: [
        { rel: 'canonical', href: 'https://thuso.dev/' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Permanent+Marker&display=swap' },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Thuso Mokopotsa',
            url: 'https://thuso.dev/',
            jobTitle: 'Senior Frontend Developer',
            description: 'Senior frontend developer — Vue.js, React, TypeScript, WebRTC.',
            knowsAbout: ['Vue.js','React','TypeScript','WebRTC','PWA','Laravel','CI/CD'],
            worksFor: { '@type': 'Organization', name: 'Tegsoft' }
          })
        }
      ]
    }
  },
  css: ['~/assets/css/global.css'],
})
