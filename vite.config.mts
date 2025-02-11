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
    pool: 'forks',
    poolOptions: {
      forks: {
        execArgv: [
          '--cpu-prof',
          '--cpu-prof-dir=test-runner-profile',
          '--heap-prof',
          '--heap-prof-dir=test-runner-profile'
        ],
        singleFork: true,
      },
    },
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
