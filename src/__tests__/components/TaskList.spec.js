import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TaskList from '../../components/TaskList';

const tasks = [
  {
    id: '1',
    name: 'Task One',
    dateTime: '2023-10-01T10:00',
    type: 'Work',
    priority: 'High',
  },
  {
    id: '2',
    name: 'Task Two',
    dateTime: '2023-10-02T12:00',
    type: 'Shopping',
    priority: 'Medium',
  },
];

describe('TaskList Component', () => {
  it('renders all tasks with correct details', () => {
    render(
      <TaskList
        tasks={tasks}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
        onCheckBoxClick={jest.fn()}
        fadingTasks={[]}
      />
    );
    expect(screen.getByText('Task One')).toBeInTheDocument();
    expect(screen.getByText('Task Two')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Shopping')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });

  it('calls onEdit when edit icon is clicked', async () => {
    const onEdit = jest.fn();
    render(
      <TaskList
        tasks={tasks}
        onDelete={jest.fn()}
        onEdit={onEdit}
        onCheckBoxClick={jest.fn()}
        fadingTasks={[]}
      />
    );
    const editButtons = screen.getAllByLabelText('edit-button');
    await userEvent.click(editButtons[0]);
    expect(onEdit).toHaveBeenCalledWith('1');
    await userEvent.click(editButtons[1]);
    expect(onEdit).toHaveBeenCalledWith('2');
  });

  it('calls onDelete when delete icon is clicked', async () => {
    const onDelete = jest.fn();
    render(
      <TaskList
        tasks={tasks}
        onDelete={onDelete}
        onEdit={jest.fn()}
        onCheckBoxClick={jest.fn()}
        fadingTasks={[]}
      />
    );
    const deleteButtons = screen.getAllByLabelText('delete-button');
    await userEvent.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalledWith('1');
    await userEvent.click(deleteButtons[1]);
    expect(onDelete).toHaveBeenCalledWith('2');
  });

  it('calls onCheckBoxClick when checkbox is clicked', async () => {
    const onCheckBoxClick = jest.fn();
    render(
      <TaskList
        tasks={tasks}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
        onCheckBoxClick={onCheckBoxClick}
        fadingTasks={[]}
      />
    );
    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]);
    expect(onCheckBoxClick).toHaveBeenCalledWith('1');
    await userEvent.click(checkboxes[1]);
    expect(onCheckBoxClick).toHaveBeenCalledWith('2');
  });
});
