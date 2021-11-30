import React, { useState } from "react";
import { FaTrashAlt, FaRegCheckCircle } from "react-icons/fa";

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

  const deleteTask = (i: number) => {
    let filtered = taskList.filter((task, index) => index !== i);
    setTaskList([...filtered]);
    console.log(filtered);
  };

  
  

  return (
    <div className="todo">
      <form className="todo__form">
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
        <button>Filter checked</button>
      </form>
      <ul>
        {taskList.map((task, i) => {
          return (
            <li className="todo__list" key={i}>
              {task}
              <FaRegCheckCircle onClick={()=> checkIfDone(i)}/>
              <FaTrashAlt onClick={() => deleteTask(i)} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
