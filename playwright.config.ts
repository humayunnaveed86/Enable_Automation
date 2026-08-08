import { defineConfig, devices } from '@playwright/test';
import { SauceDemo } from './config/env.js';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  timeout: 30000,
  expect: { timeout: 8000 },

  use: {
    baseURL:    SauceDemo.uiBaseUrl,
    screenshot: 'only-on-failure',
    trace:      'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use:  { ...devices['Desktop Chrome'] },
    },
  ],

  reporter: [['list'], ['html', { open: 'never' }]],
});
