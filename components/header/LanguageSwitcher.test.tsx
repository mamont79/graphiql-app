import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter, usePathname } from 'next/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}));

describe('LanguageSwitcher', () => {
  const mockPush = vi.fn();
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: mockPush });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders with the correct initial locale', () => {
    (usePathname as jest.Mock).mockReturnValue('/en/page');
    render(<LanguageSwitcher />);
    expect(screen.getByDisplayValue('EN')).toBeInTheDocument();
  });

  it('updates the locale when the pathname changes', () => {
    (usePathname as jest.Mock).mockReturnValue('/ru/page');
    render(<LanguageSwitcher />);
    expect(screen.getByDisplayValue('RU')).toBeInTheDocument();
  });

  it('calls router.push with the new locale when a different language is selected', () => {
    (usePathname as jest.Mock).mockReturnValue('/en/page');
    render(<LanguageSwitcher />);
    fireEvent.change(screen.getByDisplayValue('EN'), { target: { value: 'ru' } });
    expect(mockPush).toHaveBeenCalledWith('/ru/page');
  });

  it('does not call router.push if the selected language is the same as the current locale', () => {
    (usePathname as jest.Mock).mockReturnValue('/en/page');
    render(<LanguageSwitcher />);
    fireEvent.change(screen.getByDisplayValue('EN'), { target: { value: 'en' } });
    expect(mockPush).not.toHaveBeenCalled();
  });
});
