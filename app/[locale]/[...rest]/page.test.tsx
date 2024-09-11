import { render } from '@testing-library/react';
import { vi } from 'vitest';
import CatchAllPage from './page';
import { notFound } from 'next/navigation';

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

describe('CatchAllPage', () => {
  it('should call notFound on render', () => {
    render(<CatchAllPage />);

    expect(notFound).toHaveBeenCalled();
  });
});
