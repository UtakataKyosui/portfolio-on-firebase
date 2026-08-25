import { expect, test } from '@rstest/core';
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { fireEvent, render, screen } from '@testing-library/react';
import { routeTree } from '../src/routeTree.gen';

test('renders the projects page and handles category filtering', async () => {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ['/projects'] }),
  });
  render(<RouterProvider router={router} />);

  expect(await screen.findByText('Featured Projects')).toBeInTheDocument();
  expect(screen.getByText('Nexus Analytics Platform')).toBeInTheDocument();
  expect(screen.getByText('Aura Commerce')).toBeInTheDocument();
  expect(screen.getByText('Synapse Mesh')).toBeInTheDocument();
  expect(screen.getByText('FocusFlow')).toBeInTheDocument();

  // Click 'Open Source' filter button
  const ossBtn = screen.getByRole('button', { name: 'Open Source' });
  fireEvent.click(ossBtn);

  // Open Source project should remain, others should be filtered out
  expect(screen.getByText('Synapse Mesh')).toBeInTheDocument();
  expect(
    screen.queryByText('Nexus Analytics Platform'),
  ).not.toBeInTheDocument();
  expect(screen.queryByText('Aura Commerce')).not.toBeInTheDocument();
  expect(screen.queryByText('FocusFlow')).not.toBeInTheDocument();

  // Click 'All' filter button
  const allBtn = screen.getByRole('button', { name: 'All' });
  fireEvent.click(allBtn);
  expect(screen.getByText('Nexus Analytics Platform')).toBeInTheDocument();
});
