// https://nuxt.com/docs/api/configuration/nuxt-config
import authenticationRoutes from './pages/authentication/routes';
import type { NuxtPage } from 'nuxt/schema';
import commonRoutes from './pages/common/routes';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@ant-design-vue/nuxt',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'nuxt-svgo',
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
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  devServer: {
    port: 3000,
    host: 'localhost',
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
      pages.push(...authenticationRoutes, ...commonRoutes);

      function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
        const pagesToRemove: NuxtPage[] = [];
        for (const page of pages) {
          if (page.file && pattern.test(page.file)) {
            pagesToRemove.push(page);
          } else {
            removePagesMatching(pattern, page.children);
          }
        }
        for (const page of pagesToRemove) {
          pages.splice(pages.indexOf(page), 1);
        }
      }
      removePagesMatching(/\.ts$/, pages);
    },
  },
  piniaPluginPersistedstate: {
    debug: process.env.NODE_ENV === 'development',
  },
});
