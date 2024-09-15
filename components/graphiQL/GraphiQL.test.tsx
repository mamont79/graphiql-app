import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { GraphiQL } from './GraphiQL';

vi.mock('@monaco-editor/react', () => ({
  default: ({ onChange }: { onChange: (value: string) => void }) => (
    <textarea
      data-testid="monaco-editor"
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  ),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      headers: 'Headers',
      addHead: 'Add Header',
      query: 'Query',
      var: 'Variables',
      exec: 'Execute',
      res: 'Response',
    };
    return translations[key];
  },
}));

describe('GraphiQL Component', () => {
  it('should render GraphiQL with correct labels and inputs', () => {
    render(<GraphiQL />);

    expect(screen.getByText('Endpoint URL:')).toBeInTheDocument();
    expect(screen.getByText('SDL URL:')).toBeInTheDocument();
    expect(screen.getByText('Headers:')).toBeInTheDocument();
    expect(screen.getByText('Query:')).toBeInTheDocument();
    expect(screen.getByText('Variables:')).toBeInTheDocument();
    expect(screen.getByText('Response:')).toBeInTheDocument();
    expect(screen.getByText('Add Header')).toBeInTheDocument();
    expect(screen.getByText('Execute')).toBeInTheDocument();
  });

  it('should allow adding headers', () => {
    render(<GraphiQL />);

    const addHeaderButton = screen.getByText('Add Header');
    fireEvent.click(addHeaderButton);

    const headerKeyInput = screen.getAllByPlaceholderText('Header Key')[0];
    const headerValueInput = screen.getAllByPlaceholderText('Header Value')[0];

    fireEvent.change(headerKeyInput, { target: { value: 'Authorization' } });
    fireEvent.change(headerValueInput, { target: { value: 'Bearer token' } });

    expect(headerKeyInput).toHaveValue('Authorization');
    expect(headerValueInput).toHaveValue('Bearer token');
  });
});
