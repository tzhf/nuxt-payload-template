import { resolve } from 'path'

/** Vite Plugins */
import tailwindPlugin from '@tailwindcss/vite'

import possibleTypes from './graphql/possibleTypes.json'

import { writeFileSync } from 'fs'

const {
  NODE_ENV,
  SITE_NAME,
  NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_PAYLOAD_API_ROUTE,
} = process.env

const isDev = NODE_ENV !== 'production'

export default defineNuxtConfig({
  compatibilityDate: '2025-11-10',
  telemetry: {
    enabled: false,
  },
  devtools: {
    enabled: isDev,
    timeline: {
      enabled: true,
    },
  },
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxtjs/apollo',
    '@pinia/nuxt',
    '@nuxtjs/seo',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    '@nuxt/icon',
    '@nuxt/fonts',
  ],

  icon: {
    size: '1.5rem',
    customCollections: [
      {
        prefix: 'icons',
        dir: resolve('./app/assets/icons'),
      },
    ],
  },

  alias: {
    '#graphql-exports': resolve(__dirname, './graphql/index.js'),
    '#payload-config': resolve(
      __dirname,
      '../payloadcms/src/payload.config.ts',
    ),
    '#payload-types': resolve(__dirname, '../payloadcms/payload-types.d.ts'),
  },
  apollo: {
    clients: {
      default: {
        // SERVER-SIDE TARGET:
        // In production, point directly to your live Vercel Payload domain.
        // In local dev, fall back to the 127.0.0.1:3001 port.
        httpEndpoint:
          process.env.NODE_ENV === 'production'
            ? `https://nuxt-payload-template-payloadcms.vercel.app${NEXT_PUBLIC_PAYLOAD_API_ROUTE}/graphql`
            : `http://127.0.0.1:3001${NEXT_PUBLIC_PAYLOAD_API_ROUTE}/graphql`,

        // BROWSER-SIDE TARGET:
        // Keep this exactly as the author wrote it! It leverages your vercel.json rewrites.
        browserHttpEndpoint: [
          NEXT_PUBLIC_SITE_URL,
          NEXT_PUBLIC_PAYLOAD_API_ROUTE,
          '/graphql',
        ].join(''),

        inMemoryCacheOptions: { possibleTypes },
        connectToDevTools: isDev,
      },
    },
  },
  robots: {
    disallow: ['/admin', '/api', NEXT_PUBLIC_PAYLOAD_API_ROUTE],
  },
  site: {
    url: NEXT_PUBLIC_SITE_URL,
    name: SITE_NAME,
    defaultLocale: 'en',
  },
  sitemap: {
    exclude: [],
    sources: ['/api/__sitemap__/urls'],
  },
  runtimeConfig: {
    public: {
      siteName: SITE_NAME,
      siteUrl: NEXT_PUBLIC_SITE_URL,
      payloadApiRoute: NEXT_PUBLIC_PAYLOAD_API_ROUTE,
      isDev,
    },
  },
  build: { transpile: [] },
  vite: {
    plugins: [tailwindPlugin()],
    server: {
      origin: NEXT_PUBLIC_SITE_URL,
      // allowedHosts: ['example.test'],
      hmr: {
        protocol: 'wss',
        host: 'example.test',
        clientPort: 443,
      },
    },
  },

  // hooks: {
  //   async 'build:before'() {
  //     try {
  //       const res = await fetch(
  //         `http://127.0.0.1:3001${NEXT_PUBLIC_PAYLOAD_API_ROUTE}/graphql`,
  //         {
  //           method: 'POST',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify({ query: `{ SiteSettings { font } }` }),
  //         },
  //       )
  //       const { data } = await res.json()
  //       const font = data?.SiteSettings?.font || 'Inter'
  //       writeFileSync('./assets/css/fonts-dynamic.css', `@import url('https://fonts.googleapis.com/css2?family=${font}:wght@400;500;600;700;800;900&display=swap');

  // :root {
  //   --font-body: '${font}', sans-serif;
  // }`)
  //       console.log(`Dynamic font "${font}" generated.`)
  //     } catch (err) {
  //       console.warn('Could not generate dynamic fonts, using fallback:', err)
  //       writeFileSync('./assets/css/fonts-dynamic.css', `:root { --font-body: 'Inter', sans-serif; }`)
  //     }
  //   },
  // },
})
