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
    workspace: [
      {
        test: {
          name: 'playwright',
          browser: {
            instances: [
              {
                browser: 'chromium',
              },
            ],
            provider: 'playwright',
            enabled: true,
            headless: true,
          },
        },
        extends: true,
      },
      {
        test: {
          name: 'webdriverio',
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
        extends: true
      },
      {
        test: {
          name: 'jsdom',
          environment: 'jsdom',
        },
        extends: true
      }
    ]
  },
});
