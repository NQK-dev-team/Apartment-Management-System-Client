// https://nuxt.com/docs/api/configuration/nuxt-config
import { appRoutes } from './pages/routes';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  // nitro: {
  //   preset: 'node-server', // Set nitro preset for the building process
  // },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@ant-design-vue/nuxt',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'nuxt-svgo',
    '@vueuse/nuxt',
  ],
  svgo: {
    autoImportPath: './public/svg/',
  },
  plugins: ['~/plugins/api.ts'],
  eslint: {
    config: {
      stylistic: false,
    },
    checker: {
      lintOnStart: true,
      fix: false,
    },
  },
  runtimeConfig: {
    public: {
      apiBaseURL: process.env.API_BASE_URL,
      apiPrefix: process.env.API_PREFIX,
      apiVersion: process.env.API_VERSION,
      isDevMode: process.env.NODE_ENV === 'development',
      isHttps: process.env.IS_HTTPS === 'true',
      port: process.env.APP_PORT ?? '3000',
      host: process.env.APP_HOST ?? 'localhost',
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  devServer: {
    port: process.env.APP_PORT ? Number(process.env.APP_PORT) : 3000,
    host: process.env.APP_HOST ?? 'localhost',
    // https: {
    //   key: '',
    //   cert: '',
    // },
  },
  i18n: {
    locales: [
      {
        code: 'vi',
        name: 'Tiếng Việt',
        file: 'vi.ts',
        language: 'vi-VN',
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.ts',
        language: 'en-US',
      },
    ],
    strategy: 'no_prefix',
    defaultLocale: 'vi',
    langDir: '../languages',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    lazy: true,
  },
  hooks: {
    'pages:extend'(pages) {
      pages.push(...appRoutes);
    },
  },
  piniaPluginPersistedstate: {
    debug: process.env.NODE_ENV === 'development',
  },
});
