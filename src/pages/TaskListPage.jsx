import React from "react";
import TaskList from "../components/TaskList";

const TaskListPage = ({ tasks, onDelete, onEdit }) => {
  return (
    <div>
      <TaskList tasks={tasks} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
};

export default TaskListPage;
