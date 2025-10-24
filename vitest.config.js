// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setupTests.js'],
    globals: true,   // <- expone expect/vi/it globalmente
    css: true,
  },
});
