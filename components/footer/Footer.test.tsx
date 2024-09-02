import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from './Footer';
import { vi } from 'vitest';

vi.mock('next/image', () => ({
  __esModule: true,
  default: vi.fn(() => <img alt="RSS Logo" />),
}));

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <a href="https://rs.school/courses/reactjs">{children}</a>
  ),
}));

vi.mock('./PopupAuthors', () => ({
  PopupAuthors: vi.fn(() => <div>Mocked PopupAuthors</div>),
}));

describe('Footer', () => {
  it('renders without crashing', () => {
    render(<Footer />);

    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByTitle('Click to see tean members')).toBeInTheDocument();
    expect(screen.getByAltText('RSS Logo')).toBeInTheDocument();
  });

  it('contains a link to the RSSchool course', () => {
    render(<Footer />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays the PopupAuthors component when clicked', () => {
    render(<Footer />);

    const authorButton = screen.getByTitle('Click to see tean members');
    fireEvent.click(authorButton);

    expect(screen.getByText('Mocked PopupAuthors')).toBeInTheDocument();
  });
});
