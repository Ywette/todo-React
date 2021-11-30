import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState<string[]>([]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (task === "") {
      alert("please write a task");
    } else {
      setTaskList([...taskList, task]);
      setTask("");
      console.log(taskList);
    }
  };

  return (
    <div>
      <form>
        <input
          placeholder="Add a task..."
          type="text"
          value={task}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTask(e.target.value)
          }
        />
        <button
          type="submit"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}
        >
          add a task
        </button>
      </form>
      <ul>
        {taskList.map((task, i) => {
          return (
            <li key={i}>
              {task}
              <FaTrashAlt />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
