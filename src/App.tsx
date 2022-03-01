import "./App.scss";
import TodoList from "./components/TodoList";
import Planner from "./components/Planner";

const App = () => {
  return (
    <div className="app">
      <h1>Planner</h1>
      {/*<TodoList />*/}
        <Planner />
    </div>
  );
};

export default App;