import createMeta from './utils/meta/createMeta'
import glsl from 'vite-plugin-glsl'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: [],
  runtimeConfig: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  },
  app: {
    layoutTransition: true,
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en',
      },
      link: [],
      meta: [
        { name: 'theme-color', content: '#ffffff' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'color-scheme', content: 'light dark' },
        ...createMeta(process.env.BASE_URL || 'http://localhost:3000'),
      ],
    },
  },
  css: ['@/assets/styles/core/index.scss'],
  vite: {
    plugins: [glsl({ root: '/utils/glsl/' })],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/abstract";',
        },
      },
    },
  },
})
