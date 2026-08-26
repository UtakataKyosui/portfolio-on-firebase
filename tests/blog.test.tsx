import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { routeTree } from '../src/routeTree.gen';

test('renders the blog list page with articles and handles category filtering', async () => {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/blog'] }),
  });
  render(<RouterProvider router={router} />);

  expect(await screen.findByText('Writings & Thoughts')).toBeInTheDocument();
  expect(
    screen.getByText('Scaling Microservices Architecture'),
  ).toBeInTheDocument();
  expect(
    screen.getByText('React 19 の並行機能を実務で使う'),
  ).toBeInTheDocument();

  // Click 'DevOps' filter button
  const devopsBtn = screen.getByRole('button', { name: 'DevOps' });
  fireEvent.click(devopsBtn);

  // DevOps post should remain, React post should be filtered out
  expect(
    screen.getByText('CI/CD パイプラインのベストプラクティス'),
  ).toBeInTheDocument();
  expect(
    screen.queryByText('React 19 の並行機能を実務で使う'),
  ).not.toBeInTheDocument();

  // Click 'All' filter button
  const allBtn = screen.getByRole('button', { name: 'All' });
  fireEvent.click(allBtn);
  expect(
    screen.getByText('React 19 の並行機能を実務で使う'),
  ).toBeInTheDocument();
});
