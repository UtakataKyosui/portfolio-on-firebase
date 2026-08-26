import { defineConfig } from 'vitest/config';
import { sharedPlugins } from './vite.shared-plugins';

export default defineConfig({
  envPrefix: 'PUBLIC_',
  resolve: {
    tsconfigPaths: true,
  },
  plugins: sharedPlugins(),
  test: {
    environment: 'happy-dom',
    setupFiles: ['./tests/vitest.setup.ts'],
  },
});
