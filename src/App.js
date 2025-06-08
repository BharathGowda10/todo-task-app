import AddTask from "./components/AddTask";
import Header from "./components/Header";
import TaskListPage from "./pages/TaskListPage";

function App() {
  return (
    <div className="container-fluid px-0">
      <div className="app-container">
        <Header />
        <AddTask />
        <TaskListPage />
      </div>
    </div>
  );
}

export default App;
