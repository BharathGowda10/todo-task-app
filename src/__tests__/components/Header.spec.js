import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Header from '../../components/Header';

describe('Header Component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the header title', () => {
    render(<Header />);
    expect(screen.getByText(/Todo Task List/i)).toBeInTheDocument();
  });

  it('toggles dark mode when the toggle is clicked', async () => {
    render(<Header />);
    const toggle = screen.getByRole('button', { name: /light mode/i });
    expect(toggle).toBeInTheDocument();
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-label', 'dark mode');
  });
});
