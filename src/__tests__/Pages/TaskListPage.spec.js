import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskListPage from '../../pages/TaskListPage';

const tasks = [
  {
    id: '1',
    name: 'Task One',
    dateTime: '2023-10-01T10:00',
    type: 'Work',
    priority: 'High',
  },
];

describe('TaskListPage', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <TaskListPage
        tasks={tasks}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
        onCheckBoxClick={jest.fn()}
        fadingTasks={[]}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
