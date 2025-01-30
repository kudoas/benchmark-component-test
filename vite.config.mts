/// <reference types="vitest" />

import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular({ tsconfig: 'tsconfig.spec.json' })],
  test: {
    globals: true,
    setupFiles: ['src/app/test/vitest/setup-vitest.ts'],
    globalSetup: 'src/app/test/vitest/global-setup.ts',
    include: ['src/app/test/vitest/*.spec.ts'],
    browser: {
      instances: [
        {
          browser: 'chrome',
        },
      ],
      provider: 'webdriverio',
      enabled: true,
      headless: true,
    },
  },
});
