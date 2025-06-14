import TaskList from '../components/TaskList';
import PropTypes from 'prop-types';

const TaskListPage = ({
  tasks,
  onDelete,
  onEdit,
  onCheckBoxClick,
  fadingTasks,
}) => {
  return (
    <div>
      <TaskList
        tasks={tasks}
        onDelete={onDelete}
        onEdit={onEdit}
        onCheckBoxClick={onCheckBoxClick}
        fadingTasks={fadingTasks} // Assuming isChecked is not used in TaskList
      />
    </div>
  );
};
TaskListPage.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      dateTime: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCheckBoxClick: PropTypes.func.isRequired,
  fadingTasks: PropTypes.arrayOf(PropTypes.string),
};
export default TaskListPage;
