import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import TaskListPage from "./pages/TaskListPage";
import EditTask from "./components/EditTask";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [showModal, setShowModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const onAdd = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };
  const onDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };
  const onEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setTaskToEdit(taskToEdit);
    setShowModal(true);
  };

  const onSave = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setShowModal(false);
  };
  const onClose = () => {
    setShowModal(false);
  };
  return (
    <div className="container-fluid px-0">
      <div className="app-container">
        <Header />
        <AddTask onAdd={onAdd} />
        <TaskListPage tasks={tasks} onDelete={onDelete} onEdit={onEdit} />
        <EditTask
          show={showModal}
          onClose={onClose}
          task={taskToEdit}
          onSave={onSave}
        />
      </div>
    </div>
  );
}

export default App;
