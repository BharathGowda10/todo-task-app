import React, { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [formdata, setFormdata] = useState({
    name: "",
    dateTime: "",
    type: "",
    priority: "",
  });

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
    if (formdata.name.trim()) {
      onAdd && onAdd(formdata);
      setFormdata({
        name: "",
        dateTime: "",
        type: "",
        priority: "",
      });
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
          name="name"
          className="form-control form-control-lg"
          placeholder="Enter a new task"
          value={formdata.name}
          onChange={handleChange}
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
              name="dateTime"
              className="form-control"
              style={{ maxWidth: "320px", margin: "0 auto" }}
              value={formdata.dateTime}
              onChange={handleChange}
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
              name="type"
              className="form-select"
              style={{ maxWidth: "320px", margin: "0 auto" }}
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
        </div>
        <div className="col-10 col-md-4 my-3 mx-auto">
          <div className="border border-2 rounded p-3 text-center">
            <div className="mb-2">
              <label className="form-label mb-2 d-block">Task Priority</label>
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
        </div>
      </div>
    </form>
  );
};

export default AddTask;
