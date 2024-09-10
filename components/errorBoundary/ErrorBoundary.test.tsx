import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import { toast } from 'react-toastify';

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

const ProblematicComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('should catch errors and display an error message', () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();

    expect(toast.error).toHaveBeenCalledWith('An unexpected error occurred: Test error');
  });

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>All good!</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('All good!')).toBeInTheDocument();
  });
});
