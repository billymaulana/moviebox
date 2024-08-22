import process from 'node:process'
import { pwa } from './app/config/pwa'
import { appDescription } from './app/constants/index'

const isDev = process.env.NODE_ENV === 'development'

export default defineNuxtConfig({
  runtimeConfig: {
    tmdb: {
      apiKey: process.env.TMDB_API_KEY,
    },
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    'nuxt-typed-router',
    '@nuxt/icon',
    '@vite-pwa/nuxt',
    '@nuxt/eslint',
    'vue3-carousel-nuxt',
  ],

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  imports: {
    autoImport: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    '@/assets/styles/main.scss',
  ],

  icon: {
    componentName: 'NuxtIcon',
  },

  nitro: {
    preset: 'node-server',
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/', '/person'],
    },
  },
  routeRules: {
    '/**': isDev ? {} : { cache: { swr: true, maxAge: 120, staleMaxAge: 60, headersOnly: true } },
    '/api/**': { cors: true },
    '/api/tmdb/**': { swr: 3600 },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/public/tv.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#be123c' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
        { name: 'msapplication-TileColor', content: '#be123c' },
      ],
    },
  },

  pwa,

  devtools: {
    enabled: false,
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  pinia: {
    storesDirs: ['./app/stores/**'],
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/_variables.scss" as *;',
        },
      },
    },
  },

  compatibilityDate: '2024-08-19',
})
