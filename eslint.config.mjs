import prettier from 'eslint-plugin-prettier';
import vue from 'eslint-plugin-vue';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    'no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    'no-undef': 'error',
    'no-use-before-define': 'error',
    'new-cap': 'error',
    'no-empty': 'error',
    ...vue.configs['vue3-recommended'].rules,
    'vue/require-v-for-key': 'warn',
    'vue/html-self-closing': 'off',
    'vue/multi-word-component-names': 'off',
  },
  files: [
    'composables/**/*.{js,ts,jsx,tsx}',
    'components/**/*.vue',
    'languages/**/*.{js,ts,jsx,tsx}',
    'layouts/**/*.vue',
    'middlewares/**/*.{js,ts,jsx,tsx}',
    'pages/**/*.{js,ts,jsx,tsx,vue}',
    'plugins/**/*.{js,ts,jsx,tsx}',
    'services/**/*.{js,ts,jsx,tsx}',
    'stores/**/*.{js,ts,jsx,tsx}',
    'utils/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: { prettier },
});
