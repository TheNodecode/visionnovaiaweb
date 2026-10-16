import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: 'tests/e2e',
  webServer: { command: 'npm run build && npx astro preview --port 4321 --ignore-lock', port: 4321, reuseExistingServer: true, timeout: 180_000 },
  use: { baseURL: 'http://localhost:4321' },
  projects: [
    { name: 'iphone', use: { ...devices['iPhone 14'] } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
});
