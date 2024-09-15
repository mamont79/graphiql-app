import { render, screen } from '@testing-library/react';
import ApiHistoryPage from '@/app/[locale]/history/page';

describe('ApiHistoryPage', () => {
  it('should render the heading with correct text', () => {
    render(<ApiHistoryPage />);

    const heading = screen.getByRole('heading', { name: 'History' });
    expect(heading).toBeInTheDocument();
  });
});
