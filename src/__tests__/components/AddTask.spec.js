import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import AddTask from '../../components/AddTask';

describe('AddTask Component', () => {
  it('match snap shot', () => {
    const { asFragment } = render(<AddTask onAdd={jest.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders Input and Button', () => {
    render(<AddTask onAdd={jest.fn()} />);
    expect(
      screen.getByPlaceholderText(/enter a new task/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add task/i })
    ).toBeInTheDocument();
  });
  it('should validate for empty input box', async () => {
    const onAdd = jest.fn();
    render(<AddTask onAdd={onAdd} />);
    const button = screen.getByRole('button', { name: /add task/i });
    await userEvent.click(button);
    expect(
      await screen.findByText(/input field is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Date & Time Is Required/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/select any one type/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/select any one priority/i)
    ).toBeInTheDocument();
    expect(onAdd).not.toHaveBeenCalled();
  });

  it('submit form successfully', async () => {
    const onAdd = jest.fn();
    render(<AddTask onAdd={onAdd} />);
    const input = screen.getByPlaceholderText(/enter a new task/i);
    await userEvent.type(input, 'Task 1');
    const dateTimeInput = screen.getByLabelText(/select date & time/i);
    userEvent.clear(dateTimeInput);
    fireEvent.change(dateTimeInput, { target: { value: '2023-10-01T10:00' } });
    const typeSelect = screen.getByLabelText(/task type/i);
    await userEvent.selectOptions(typeSelect, 'Work');
    const highPriorityBadge = screen.getByText(/high/i);
    userEvent.click(highPriorityBadge);
    const button = screen.getByRole('button', { name: /add task/i });
    userEvent.click(button);
    await waitFor(() =>
      expect(onAdd).toHaveBeenCalledWith({
        name: 'Task 1',
        dateTime: '2023-10-01T10:00',
        type: 'Work',
        priority: 'High',
      })
    );
  });
  it('should highlight the selected priority badge with border-primary', async () => {
    render(<AddTask onAdd={jest.fn()} />);
    const highBadge = screen.getByText(/high/i);
    const mediumBadge = screen.getByText(/medium/i);
    const lowBadge = screen.getByText(/low/i);

    // Initially, none should have border-primary
    expect(highBadge).not.toHaveClass('border-primary');
    expect(mediumBadge).not.toHaveClass('border-primary');
    expect(lowBadge).not.toHaveClass('border-primary');

    // Click High
    await userEvent.click(highBadge);
    expect(highBadge).toHaveClass('border-primary');
    expect(mediumBadge).not.toHaveClass('border-primary');
    expect(lowBadge).not.toHaveClass('border-primary');

    // Click Medium
    await userEvent.click(mediumBadge);
    expect(mediumBadge).toHaveClass('border-primary');
    expect(highBadge).not.toHaveClass('border-primary');
    expect(lowBadge).not.toHaveClass('border-primary');

    // Click Low
    await userEvent.click(lowBadge);
    expect(lowBadge).toHaveClass('border-primary');
    expect(highBadge).not.toHaveClass('border-primary');
    expect(mediumBadge).not.toHaveClass('border-primary');
  });
});
