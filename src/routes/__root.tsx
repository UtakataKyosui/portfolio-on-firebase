import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import '../App.css';

// Issue #33 の binding 疎通確認用。後続 Issue で実際の binding (D1/R2) の確認に置き換える予定。
const checkCloudflareBinding = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { env } = await import(/* @vite-ignore */ 'cloudflare:workers');
    console.log('[cloudflare-binding-check]', env.DUMMY_BINDING);
    return null;
  },
);

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  }),
  beforeLoad: async () => {
    // TanStack Start のサーバーランタイム外 (Vitest 等) では createServerFn の
    // 呼び出し自体が AsyncLocalStorage エラーを投げるため、ナビゲーションは
    // 止めずにログだけ残す
    try {
      await checkCloudflareBinding();
    } catch (error) {
      console.error('[cloudflare-binding-check] failed', error);
    }
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="ja">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            <Outlet />
          </main>
          <SiteFooter />
        </div>
        <Scripts />
      </body>
    </html>
  );
}
