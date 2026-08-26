import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { routeTree } from '../src/routeTree.gen';

test('renders the main page', async () => {
  const testMessage =
    'I build digital experiences that blend form and function';
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/'] }),
  });
  render(<RouterProvider router={router} />);
  expect(await screen.findByText(testMessage)).toBeInTheDocument();
});
