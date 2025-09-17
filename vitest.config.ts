import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/unit_tests/*.spec.ts', 'test/unit_tests/*.test.ts'], // Only include unit tests
    exclude: ['test/E2E_tests/*', 'node_modules/**/*'], // Exclude Playwright tests
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, '.'),
      '@': resolve(__dirname, '.'),
    },
  },
})