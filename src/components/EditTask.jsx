import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

const EditTask = ({ show, onClose, onSave, task }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      dateTime: "",
      type: "",
      priority: "",
    },
  });

  useEffect(() => {
    if (task) {
      reset(task);
    }
  }, [task, reset]);

  const selectedPriority = watch("priority");

  const onSubmit = (data) => {
    onSave && onSave(data);
  };

  const handlePriority = (priority) => {
    setValue("priority", priority, { shouldValidate: true });
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ background: "rgba(0,0,0,0.3)" }}
    >
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={handleSubmit(onSubmit)}>
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
              <label htmlFor="edit-task-name" className="form-label">
                Task Name
              </label>
              <input
                type="text"
                name="name"
                id="edit-task-name"
                className="form-control"
                {...register("name", { required: "Input Field Is Required" })}
                autoComplete="off"
              />
              {errors.name && (
                <span className="text-danger mt-1 d-flex align-items-center">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="edit-task-datetime" className="form-label">
                Date &amp; Time
              </label>
              <input
                type="datetime-local"
                name="dateTime"
                id="edit-task-datetime"
                className="form-control"
                {...register("dateTime", {
                  required: "Date & Time Is Required",
                })}
              />
              {errors.dateTime && (
                <span className="text-danger mt-1 d-flex align-items-center">
                  {errors.dateTime.message}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="edit-task-type" className="form-label">
                Task Type
              </label>
              <select
                name="type"
                id="edit-task-type"
                className="form-select"
                {...register("type", { required: "Select Any One Type" })}
              >
                <option value="">Select type</option>
                <option value="Work">Work</option>
                <option value="Shopping">Shopping</option>
                <option value="Chores">Chores</option>
                <option value="Others">Others</option>
              </select>
              {errors.type && (
                <span className="text-danger mt-1 d-flex align-items-center">
                  {errors.type.message}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="edit-task-priority"
                className="form-label d-block"
              >
                Task Priority
              </label>
              <input
                type="hidden"
                id="edit-task-priority"
                {...register("priority", {
                  required: "Select Any One Priority",
                })}
              />
              <span
                className={`badge bg-danger fs-6 me-2 ${
                  selectedPriority === "High"
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
                  selectedPriority === "Medium"
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
                  selectedPriority === "Low"
                    ? "border border-3 border-primary"
                    : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => handlePriority("Low")}
              >
                Low
              </span>
              {errors.priority && (
                <span className="text-danger mt-1 d-flex align-items-center justify-content-center">
                  {errors.priority.message}
                </span>
              )}
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

EditTask.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  task: PropTypes.shape({
    name: PropTypes.string,
    dateTime: PropTypes.string,
    type: PropTypes.string,
    priority: PropTypes.string,
  }).isRequired,
};

export default EditTask;
