import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { MdWarning } from "react-icons/md";

const AddTask = ({ onAdd }) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      dateTime: "",
      type: "",
      priority: "",
    },
    mode: "onSubmit",
  });

  const selectedPriority = watch("priority");

  const onSubmit = (data) => {
    if (data.name.trim()) {
      onAdd(data);
      reset();
    }
  };

  const handlePriorityClick = (priority) => {
    setValue("priority", priority, { shouldValidate: true });
  };

  return (
    <form
      className="row mb-3 py-4 justify-content-center align-items-center gap-2 gap-md-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className="col-10 d-flex flex-column flex-md-row align-items-center justify-content-center"
        style={{ gap: "10px" }}
      >
        <div className="w-100">
          <input
            type="text"
            name="name"
            id="task-name"
            {...register("name", {
              required: "Input Field Is Required",
            })}
            className="form-control form-control-lg"
            placeholder="Enter a new task"
            autoComplete="off"
          />
          {errors?.name?.message && (
            <span className="text-danger ms-2 mt-1 fs-6 d-flex align-items-center">
              <MdWarning className="me-1 fs-5" />
              {errors.name.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          id="add-task-button"
          className="btn submit-button btn-warning btn-lg mt-2 mt-md-0 align-self-start"
        >
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
              {...register("dateTime", {
                required: "Date & Time Is Required",
              })}
              className="form-control"
              style={{ maxWidth: "320px", margin: "0 auto" }}
            />
            {errors?.dateTime?.message && (
              <span
                style={{ maxWidth: "320px" }}
                className="text-danger mx-auto mt-1 fs-6 d-flex align-items-center"
              >
                <MdWarning className="me-1 fs-5" />
                {errors.dateTime.message}
              </span>
            )}
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
              {...register("type", {
                required: "Select Any One Type",
              })}
              className="form-select"
              style={{ maxWidth: "320px", margin: "0 auto" }}
            >
              <option value="">Select type</option>
              <option value="Work">Work</option>
              <option value="Shopping">Shopping</option>
              <option value="Chores">Chores</option>
              <option value="Others">Others</option>
            </select>
            {errors?.type?.message && (
              <span
                style={{ maxWidth: "320px" }}
                className="text-danger mx-auto mt-1 fs-6 d-flex align-items-center"
              >
                <MdWarning className="me-1 fs-5" />
                {errors.type.message}
              </span>
            )}
          </div>
        </div>
        <div className="col-10 col-md-4 my-3 mx-auto">
          <div className="border border-2 rounded p-3 text-center">
            <div className="mb-2">
              <label className="form-label mb-2 d-block">Task Priority</label>
              <input
                type="hidden"
                {...register("priority", {
                  required: "Select Any One Priority",
                })}
              />
              <span
                className={`badge bg-danger fs-6 me-2 ${
                  selectedPriority === "High"
                    ? "border border-2 border-primary"
                    : ""
                }`}
                style={{ cursor: "pointer", border: "none" }}
                onClick={() => handlePriorityClick("High")}
              >
                High
              </span>
              <span
                className={`badge bg-warning text-dark fs-6 me-2 ${
                  selectedPriority === "Medium"
                    ? "border border-2 border-primary"
                    : ""
                }`}
                style={{ cursor: "pointer", border: "none" }}
                onClick={() => handlePriorityClick("Medium")}
              >
                Medium
              </span>
              <span
                className={`badge bg-success fs-6 ${
                  selectedPriority === "Low"
                    ? "border border-2 border-primary"
                    : ""
                }`}
                style={{ cursor: "pointer", border: "none" }}
                onClick={() => handlePriorityClick("Low")}
              >
                Low
              </span>
              {errors?.priority?.message && (
                <span
                  className="text-danger mt-1 fs-6 d-flex align-items-center justify-content-center"
                  style={{ width: "100%" }}
                >
                  <MdWarning className="me-1 fs-5" />
                  {errors.priority.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

AddTask.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddTask;
