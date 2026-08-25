import fs from 'node:fs';
import path from 'node:path';
import server from '../dist/server/index.js';

const routes = ['/', '/blog', '/projects'];

for (const route of routes) {
  const res = await server.fetch(new Request(`http://localhost${route}`));
  if (!res.ok) {
    throw new Error(`Failed to prerender ${route}: HTTP ${res.status}`);
  }
  const html = await res.text();
  const outDir =
    route === '/' ? './dist/client' : path.join('./dist/client', route);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
  console.log(`[prerender] ${route} -> ${path.join(outDir, 'index.html')}`);
}
