import "./App.scss";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div className="app">
      <h1>todo list</h1>
      <TodoList />
    </div>
  );
};

export default App;
