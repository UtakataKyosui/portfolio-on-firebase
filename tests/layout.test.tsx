import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { SiteFooter } from '../src/components/site-footer';
import { SiteHeader } from '../src/components/site-header';

function createTestRouter(initialPath = '/') {
  const rootRoute = createRootRoute();
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <SiteHeader />,
  });
  const blogRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/blog',
    component: () => <SiteHeader />,
  });
  const projectsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/projects',
    component: () => <SiteHeader />,
  });

  const routeTree = rootRoute.addChildren([
    indexRoute,
    blogRoute,
    projectsRoute,
  ]);

  return createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [initialPath] }),
  });
}

test('renders SiteHeader navigation links and handles mobile toggle', async () => {
  const router = createTestRouter('/');
  render(<RouterProvider router={router} />);

  expect(await screen.findByText('Portfolio')).toBeInTheDocument();
  expect(screen.getAllByText('ホーム').length).toBeGreaterThan(0);
  expect(screen.getAllByText('ブログ').length).toBeGreaterThan(0);
  expect(screen.getAllByText('プロジェクト').length).toBeGreaterThan(0);
  expect(screen.getAllByText('お問い合わせ').length).toBeGreaterThan(0);

  const toggleBtn = screen.getByRole('button', { name: 'メニューを開く' });
  expect(toggleBtn).toBeInTheDocument();
  expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

  fireEvent.click(toggleBtn);
  expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
  expect(
    screen.getByRole('button', { name: 'メニューを閉じる' }),
  ).toBeInTheDocument();
});

test('renders SiteFooter copyright and external social links', () => {
  render(<SiteFooter />);

  const currentYear = new Date().getFullYear().toString();
  expect(
    screen.getByText(new RegExp(`© ${currentYear} Portfolio`)),
  ).toBeInTheDocument();

  const githubLink = screen.getByRole('link', { name: /GitHub/i });
  expect(githubLink).toHaveAttribute('href', 'https://github.com/');
  expect(githubLink).toHaveAttribute('target', '_blank');
  expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
});
