// Usa el entrypoint especial para Vitest (no el de Jest)
import { vi, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom'

// Silenciar warnings de React Router v7 future flags en tests
const origWarn = console.warn;

beforeAll(() => {
  vi.spyOn(console, 'warn').mockImplementation((...args) => {
    const msg = (args?.[0] || '').toString();
    if (msg.includes('React Router Future Flag Warning')) return;
    origWarn(...args);
  });
});

afterAll(() => {
  console.warn.mockRestore?.();
});
