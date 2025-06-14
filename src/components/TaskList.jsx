import PropTypes from 'prop-types';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TaskList = ({
  tasks = [],
  onDelete,
  onEdit,
  onCheckBoxClick,
  fadingTasks,
}) => {
  return (
    <div className="row">
      <div className="col-10 offset-1">
        <ul className="list-group">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`list-group-item border border-secondary rounded mb-2 ${
                fadingTasks && fadingTasks.includes(task.id) ? 'fade' : ''
              }`}
            >
              <div className="row align-items-center">
                {/* Checkbox */}
                <div className="col-1 d-flex justify-content-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`checkbox-${task.id}`}
                    name={`checkbox-${task.id}`}
                    aria-label="Task completion checkbox"
                    checked={fadingTasks.includes(task.id)}
                    onClick={() => onCheckBoxClick(task.id)}
                    style={{
                      cursor: 'pointer',
                      width: '1.5rem',
                      height: '1.5rem',
                    }}
                  />
                </div>
                {/* Name and Date */}
                <div className="col-5 d-flex flex-column">
                  <span
                    className={`fw-bold fs-6 ${
                      fadingTasks && fadingTasks.includes(task.id)
                        ? 'strike-through'
                        : ''
                    }`}
                  >
                    {task.name}
                  </span>
                  <span className="text-muted small">{task.dateTime}</span>
                </div>
                {/* Type and Priority */}
                <div className="col-4 d-flex flex-column">
                  <span className="badge fontsize bg-info text-dark mb-1">
                    {task.type}
                  </span>
                  <span
                    className={`badge fontsize ${
                      task.priority === 'High'
                        ? 'bg-danger'
                        : task.priority === 'Medium'
                          ? 'bg-warning text-dark'
                          : 'bg-success'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
                {/* Edit and Delete Icons */}
                <div className="col-2 d-flex justify-content-evenly align-items-center gap-1">
                  <FaEdit
                    onClick={() => onEdit(task.id)}
                    size="30px"
                    role="button"
                    data-testid="edit-button"
                    aria-label="edit-button"
                    style={{ cursor: 'pointer' }}
                  />
                  <FaTrash
                    onClick={() => onDelete(task.id)}
                    size="25px"
                    role="button"
                    data-testid="delete-button"
                    aria-label="delete-button"
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

TaskList.propTypes = {
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

export default TaskList;
