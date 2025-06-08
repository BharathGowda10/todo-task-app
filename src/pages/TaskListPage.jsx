import React from "react";
import TaskList from "../components/TaskList";

const TaskListPage = () => {
  const tasks = [
    {
      id: 1,
      name: "Complete React project",
      date: "2023-10-01",
      time: "10:00 AM",
      type: "Work",
      priority: "High",
      completed: false,
    },
    {
      id: 2,
      name: "Grocery shopping",
      date: "2023-10-02",
      time: "5:00 PM",
      type: "Personal",
      priority: "Medium",
      completed: false,
    },
    {
      id: 3,
      name: "Gym workout",
      date: "2023-10-03",
      time: "7:00 AM",
      type: "Health",
      priority: "Low",
      completed: true,
    },
  ];
  return (
    <div>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TaskListPage;
