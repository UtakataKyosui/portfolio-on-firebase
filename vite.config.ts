import { cloudflare } from '@cloudflare/vite-plugin';
import { defineConfig } from 'vite';
import { sharedPlugins } from './vite.shared-plugins';

export default defineConfig({
  envPrefix: 'PUBLIC_',
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    ...sharedPlugins(),
  ],
});
