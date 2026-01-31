import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig, mergeConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

import viteConfig from './vite.config';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Vitest config for Storybook component tests (addon-vitest and CLI).
// Ensures browser mode and timeouts so "Component tests didn't complete" is avoided.
// Install Playwright browser if needed: npx playwright install chromium
export default mergeConfig(
  viteConfig,
  defineConfig({
    optimizeDeps: {
      include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    },
    test: {
      projects: [
        {
          extends: true,
          plugins: [
            storybookTest({
              configDir: path.join(dirname, '.storybook'),
              storybookScript: 'npm run storybook -- --no-open',
            }),
          ],
          test: {
            name: 'storybook',
            browser: {
              enabled: true,
              headless: true,
              provider: playwright({}),
              instances: [{ browser: 'chromium' }],
            },
            setupFiles: [path.join(dirname, '.storybook', 'vitest.setup.ts')],
            testTimeout: 30000,
            hookTimeout: 15000,
            coverage: {
              provider: 'v8',
              reporter: ['html', 'text-summary'],
              reportsDirectory: path.join(dirname, 'coverage'),
              exclude: [
                '**/node_modules/**',
                '**/.storybook/**',
                '**/*.stories.*',
                '**/storybook-static/**',
                '**/dist/**',
              ],
            },
          },
        },
      ],
    },
  })
);
