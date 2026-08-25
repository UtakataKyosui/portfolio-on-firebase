import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import type React from 'react';
import { Route } from '../src/routes/index';

test('renders the main page', () => {
  const testMessage = 'Rsbuild with React';
  const HomePage = Route.options.component as () => React.ReactElement;
  render(<HomePage />);
  expect(screen.getByText(testMessage)).toBeInTheDocument();
});
