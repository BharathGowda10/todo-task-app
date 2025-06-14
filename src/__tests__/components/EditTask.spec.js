import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import EditTask from '../../components/EditTask';

const mockTask = {
  name: 'Test Task',
  dateTime: '2023-10-01T10:00',
  type: 'Work',
  priority: 'High',
};

describe('EditTask Component', () => {
  it('renders with initial values and updates successfully', async () => {
    const onSave = jest.fn();
    const onClose = jest.fn();

    render(
      <EditTask show={true} onClose={onClose} onSave={onSave} task={mockTask} />
    );

    // Check initial values
    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2023-10-01T10:00')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Work')).toBeInTheDocument();
    expect(screen.getByText('High')).toHaveClass('border-primary');

    // Change name
    const nameInput = screen.getByLabelText(/task name/i);
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Updated Task');

    // Change date
    const dateInput = screen.getByLabelText(/date & time/i);
    userEvent.clear(dateInput);
    fireEvent.change(dateInput, {
      target: { value: '2023-11-01T12:00' },
    });

    // Change type
    const typeSelect = screen.getByLabelText(/task type/i);
    await userEvent.selectOptions(typeSelect, 'Shopping');

    // Change priority
    const mediumBadge = screen.getByText(/medium/i);
    await userEvent.click(mediumBadge);

    // Submit
    const saveButton = screen.getByRole('button', { name: /save changes/i });
    await userEvent.click(saveButton);

    await waitFor(() =>
      expect(onSave).toHaveBeenCalledWith({
        name: 'Updated Task',
        dateTime: '2023-11-01T12:00',
        type: 'Shopping',
        priority: 'Medium',
      })
    );
  });

  it('calls onClose when cancel is clicked', async () => {
    const onSave = jest.fn();
    const onClose = jest.fn();

    render(
      <EditTask show={true} onClose={onClose} onSave={onSave} task={mockTask} />
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('shows validation errors if fields are empty', async () => {
    const onSave = jest.fn();
    const onClose = jest.fn();

    render(
      <EditTask show={true} onClose={onClose} onSave={onSave} task={mockTask} />
    );

    // Clear all fields
    await userEvent.clear(screen.getByLabelText(/task name/i));
    await userEvent.clear(screen.getByLabelText(/date & time/i));
    await userEvent.selectOptions(screen.getByLabelText(/task type/i), '');

    const saveButton = screen.getByRole('button', { name: /save changes/i });
    await userEvent.click(saveButton);

    expect(
      await screen.findByText(/input field is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/date & time is required/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/select any one type/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it('should highlight the selected priority badge with border-primary', async () => {
    render(
      <EditTask
        show={true}
        onClose={jest.fn()}
        onSave={jest.fn()}
        task={mockTask}
      />
    );
    const highBadge = screen.getByText(/high/i);
    const mediumBadge = screen.getByText(/medium/i);
    const lowBadge = screen.getByText(/low/i);

    // High should be selected initially
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

    await userEvent.click(highBadge);
    expect(highBadge).toHaveClass('border-primary');
    expect(mediumBadge).not.toHaveClass('border-primary');
    expect(lowBadge).not.toHaveClass('border-primary');
  });
});
