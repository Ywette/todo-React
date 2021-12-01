import React, { useState } from "react";
import { FaTrashAlt, FaRegCheckCircle } from "react-icons/fa";
type Task = {
  text: string;
  completed: boolean;
};
const TodoList = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (task === "") {
      alert("please write a task");
    } else {
      const newTask = {
        text: task,
        completed: false,
      };
      setTaskList([
        ...taskList,
        {
          text: task,
          completed: false,
        },
      ]);
      setTask("");
      console.log(taskList);
    }
  };

  const deleteTask = (i: number) => {
    let filtered = taskList.filter((task, index) => index !== i);
    console.log(filtered);

    setTaskList([...filtered]);
    console.log(filtered);
  };

  const checkIfDone = (index: number) => {
    const editedTask = [...taskList];
    taskList[index].completed = !taskList[index].completed;
    setTaskList(editedTask);
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
            <div className="todo__listWrapper">
              <li className="todo__list" key={i}>
                {task.text}
              </li>
              {
                <FaRegCheckCircle
                  onClick={() => checkIfDone(i)}
                  style={{
                    backgroundColor: `${
                      task.completed ? "green" : "transparent"
                    }`,
                  }}
                />
              }{" "}
              <FaTrashAlt
                className="todo__trachIcon"
                onClick={() => deleteTask(i)}
              />
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
