import React, { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      onAdd && onAdd(task);
      setTask("");
    }
  };

  return (
    <form
      className="row mb-3 py-4 justify-content-center align-items-center gap-2 gap-md-0"
      onSubmit={handleSubmit}
    >
      <div className="col-10 col-md-8 d-flex justify-content-center">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div
        className="col-10 col-md-2 d-flex justify-content-center mt-3 mt-md-0"
        style={{ gap: "10px" }}
      >
        <button type="submit" className="btn btn-warning btn-lg w-100 h-100">
          Add Task
        </button>
      </div>
      <div className="row mb-3">
        <div className="col-10 col-md-4 my-3 mb-md-0 mx-auto">
          <div className="border border-2 rounded p-3 text-center">
            <label htmlFor="task-datetime" className="form-label mb-2">
              Select Date &amp; Time
            </label>
            <input
              type="datetime-local"
              id="task-datetime"
              className="form-control"
              style={{ maxWidth: "320px", margin: "0 auto" }}
            />
          </div>
        </div>
        <div className="col-10 col-md-4 my-3 mb-md-0 mx-auto">
          <div className="border border-2 rounded p-3 text-center">
            <label htmlFor="task-type" className="form-label mb-2">
              Task Type
            </label>
            <select
              id="task-type"
              className="form-select"
              style={{ maxWidth: "320px", margin: "0 auto" }}
            >
              <option value="">Select type</option>
              <option value="Work">Work</option>
              <option value="Shopping">Shopping</option>
              <option value="Chores">Chores</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>
        <div className="col-10 col-md-4 my-3 mx-auto">
          <div className="border border-2 rounded p-3 text-center">
            <div className="mb-2">
              <label className="form-label mb-2 d-block">Task Priority</label>
              <span
                className={`badge bg-danger fs-6 me-2 ${
                  priority === "High" ? "border border-3 border-primary" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setPriority("High")}
              >
                High
              </span>
              <span
                className={`badge bg-warning text-dark fs-6 me-2 ${
                  priority === "Medium" ? "border border-3 border-primary" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setPriority("Medium")}
              >
                Medium
              </span>
              <span
                className={`badge bg-success fs-6 ${
                  priority === "Low" ? "border border-3 border-primary" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setPriority("Low")}
              >
                Low
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddTask;
