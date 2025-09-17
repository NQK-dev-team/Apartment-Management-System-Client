
// @ts-nocheck


export const localeCodes =  [
  "vi",
  "en"
]

export const localeLoaders = {
  "vi": [{ key: "../languages/vi.ts", load: () => import("../languages/vi.ts" /* webpackChunkName: "locale_H_58_H_58_Projects_Appartment_Management_System_Client_languages_vi_ts" */), cache: true }],
  "en": [{ key: "../languages/en.ts", load: () => import("../languages/en.ts" /* webpackChunkName: "locale_H_58_H_58_Projects_Appartment_Management_System_Client_languages_en_ts" */), cache: true }]
}

export const vueI18nConfigs = [
  
]

export const nuxtI18nOptions = {
  "restructureDir": "i18n",
  "experimental": {
    "localeDetector": "",
    "switchLocalePathLinkSSR": false,
    "autoImportTranslationFunctions": false,
    "typedPages": true,
    "typedOptionsAndMessages": false
  },
  "bundle": {
    "compositionOnly": true,
    "runtimeOnly": false,
    "fullInstall": true,
    "dropMessageCompiler": false
  },
  "compilation": {
    "jit": true,
    "strictMessage": true,
    "escapeHtml": false
  },
  "customBlocks": {
    "defaultSFCLang": "json",
    "globalSFCScope": false
  },
  "vueI18n": "",
  "locales": [
    {
      "code": "vi",
      "name": "Tiếng Việt",
      "language": "vi-VN",
      "files": [
        "H:/Projects/Appartment-Management-System-Client/languages/vi.ts"
      ]
    },
    {
      "code": "en",
      "name": "English",
      "language": "en-US",
      "files": [
        "H:/Projects/Appartment-Management-System-Client/languages/en.ts"
      ]
    }
  ],
  "defaultLocale": "vi",
  "defaultDirection": "ltr",
  "routesNameSeparator": "___",
  "trailingSlash": false,
  "defaultLocaleRouteNameSuffix": "default",
  "strategy": "no_prefix",
  "lazy": true,
  "langDir": "../languages",
  "detectBrowserLanguage": {
    "alwaysRedirect": false,
    "cookieCrossOrigin": false,
    "cookieDomain": null,
    "cookieKey": "i18n_redirected",
    "cookieSecure": false,
    "fallbackLocale": "",
    "redirectOn": "root",
    "useCookie": true
  },
  "differentDomains": false,
  "baseUrl": "",
  "customRoutes": "page",
  "pages": {},
  "skipSettingLocaleOnNavigate": false,
  "types": "composition",
  "debug": false,
  "parallelPlugin": false,
  "multiDomainLocales": false,
  "i18nModules": []
}

export const normalizedLocales = [
  {
    "code": "vi",
    "name": "Tiếng Việt",
    "language": "vi-VN",
    "files": [
      {
        "path": "H:/Projects/Appartment-Management-System-Client/languages/vi.ts"
      }
    ]
  },
  {
    "code": "en",
    "name": "English",
    "language": "en-US",
    "files": [
      {
        "path": "H:/Projects/Appartment-Management-System-Client/languages/en.ts"
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false

export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18nInternal"
export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
