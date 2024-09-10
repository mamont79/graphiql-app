import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PopupAuthors } from './PopupAuthors';
import { vi } from 'vitest';
import { useTranslations } from 'next-intl';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));

vi.mock('@/constants/authors', () => ({
  authors: [
    {
      id: 1,
      image: '/author1.jpg',
      name: 'Author One',
      position: 'Developer',
      linkGH: 'https://github.com/author1',
    },
    {
      id: 2,
      image: '/author2.jpg',
      name: 'Author Two',
      position: 'Designer',
      linkGH: 'https://github.com/author2',
    },
  ],
}));

describe('PopupAuthors', () => {
  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
  });

  it('renders without crashing', () => {
    render(<PopupAuthors />);
    expect(screen.getByText('authors')).toBeInTheDocument();
  });

  it('opens the popup when the "authors" button is clicked', () => {
    render(<PopupAuthors />);

    const authorsButton = screen.getByText('authors');
    fireEvent.click(authorsButton);

    expect(screen.getByText('Author One')).toBeInTheDocument();
    expect(screen.getByText('Author Two')).toBeInTheDocument();
  });

  it('closes the popup when clicking outside the popup content', () => {
    render(<PopupAuthors />);

    const authorsButton = screen.getByText('authors');
    fireEvent.click(authorsButton);

    expect(screen.queryByText('Author One')).toBeInTheDocument();

    const overlay = authorsButton.nextSibling;
    fireEvent.click(overlay!);

    expect(screen.queryByText('Author One')).not.toBeInTheDocument();
    expect(screen.queryByText('Author Two')).not.toBeInTheDocument();
  });

  it('shows correct author details inside the popup', () => {
    render(<PopupAuthors />);

    const authorsButton = screen.getByText('authors');
    fireEvent.click(authorsButton);

    const author1 = screen.getByText('Author One');
    const author2 = screen.getByText('Author Two');

    expect(author1).toBeInTheDocument();
    expect(author2).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('Designer')).toBeInTheDocument();
  });

  it("opens the author's GitHub profile when the link is clicked", () => {
    render(<PopupAuthors />);

    const authorsButton = screen.getByText('authors');
    fireEvent.click(authorsButton);

    const githubLink = screen.getAllByText('Visit my GitHub')[0].closest('a');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/author1');
  });
});
