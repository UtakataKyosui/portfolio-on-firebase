import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  envPrefix: 'PUBLIC_',
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [tanstackStart(), react({ compiler: true }), tailwindcss()],
  test: {
    environment: 'happy-dom',
    setupFiles: ['./tests/vitest.setup.ts'],
  },
});
