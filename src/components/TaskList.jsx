import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TaskList = ({ tasks = [], onDelete, onEdit }) => {
  return (
    <div className="row">
      <div className="col-10 offset-1">
        <ul className="list-group">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item border border-secondary rounded mb-2"
            >
              <div className="row align-items-center">
                {/* Checkbox */}
                <div className="col-1 d-flex justify-content-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={task.completed}
                    readOnly
                    style={{
                      cursor: "pointer",
                      width: "1.5rem",
                      height: "1.5rem",
                    }}
                  />
                </div>
                {/* Name and Date */}
                <div className="col-5 d-flex flex-column">
                  <span className="fw-bold fs-6">{task.name}</span>
                  <span className="text-muted small">{task.dateTime}</span>
                </div>
                {/* Type and Priority */}
                <div className="col-4 d-flex flex-column">
                  <span className="badge fontsize bg-info text-dark mb-1">
                    {task.type}
                  </span>
                  <span
                    className={`badge fontsize ${
                      task.priority === "High"
                        ? "bg-danger"
                        : task.priority === "Medium"
                        ? "bg-warning text-dark"
                        : "bg-success"
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
                    style={{ cursor: "pointer" }}
                  />
                  <FaTrash
                    onClick={() => onDelete(task.id)}
                    size="25px"
                    style={{ cursor: "pointer" }}
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

export default TaskList;
