import React, { useState, useEffect } from "react";

const EditTask = ({ show, onClose, onSave, task }) => {
  const [formdata, setFormdata] = useState({
    name: "",
    dateTime: "",
    type: "",
    priority: "",
  });

  useEffect(() => {
    if (task) setFormdata(task);
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriority = (priority) => {
    setFormdata((prev) => ({
      ...prev,
      priority,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave && onSave(formdata);
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ background: "rgba(0,0,0,0.3)" }}
    >
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">Edit Task</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Task Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formdata.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Date &amp; Time</label>
              <input
                type="datetime-local"
                name="dateTime"
                className="form-control"
                value={formdata.dateTime}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Task Type</label>
              <select
                name="type"
                className="form-select"
                value={formdata.type}
                onChange={handleChange}
              >
                <option value="">Select type</option>
                <option value="Work">Work</option>
                <option value="Shopping">Shopping</option>
                <option value="Chores">Chores</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label d-block">Task Priority</label>
              <span
                className={`badge bg-danger fs-6 me-2 ${
                  formdata.priority === "High"
                    ? "border border-3 border-primary"
                    : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => handlePriority("High")}
              >
                High
              </span>
              <span
                className={`badge bg-warning text-dark fs-6 me-2 ${
                  formdata.priority === "Medium"
                    ? "border border-3 border-primary"
                    : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => handlePriority("Medium")}
              >
                Medium
              </span>
              <span
                className={`badge bg-success fs-6 ${
                  formdata.priority === "Low"
                    ? "border border-3 border-primary"
                    : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => handlePriority("Low")}
              >
                Low
              </span>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
