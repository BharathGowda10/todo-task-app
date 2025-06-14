import { render, screen } from '@testing-library/react';
import AddTask from '../../src/components/AddTask';

describe('AddTask Component', () => {
  it('renders Input and Button', () => {
    render(<AddTask onAdd={jest.fn()} />);
    expect(screen.getByPlaceholderText('Enter a new task')).toBeInTheDocument();
    expect(screen.getByLabelText('Add Task')).toBeInTheDocument();
  });
});
