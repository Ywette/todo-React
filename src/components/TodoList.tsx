import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaRegCheckCircle } from "react-icons/fa";
type Task = {
  text: string;
  completed: boolean;
};
const TodoList = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [editText, setEditText] = useState<string>("");

  // useEffect(() => {
  //   const temp = localStorage.getItem("todos");
  //   const loadedTodos = JSON.parse(temp);

  //   if (loadedTodos) {
  //     setTaskList(loadedTodos);
  //   }
  // }, []);
  // useEffect(() => {
  //   const localStorageList = JSON.stringify(taskList);
  //   localStorage.setItem("todos", localStorageList);
  // }, [taskList]);

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
    }
  };

  const deleteTask = (i: number) => {
    const filtered = taskList.filter((task, index) => index !== i);
    setTaskList([...filtered]);
  };

  const checkIfDone = (index: number) => {
    const editedTask = [...taskList];
    taskList[index].completed = !taskList[index].completed;
    setTaskList(editedTask);
  };

  const toggleDone = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const editedList = [...taskList].filter((task) => task.completed);
    setTaskList(editedList);
  };

  const editTodo = (i: number) => {
    const updatedTodos = [...taskList].map((taskListItem, index) => {
      if (index === i) {
        taskListItem.text = editText;
      }
      return taskListItem;
    });
    setTaskList(updatedTodos);
    setEditText("");
    setEditIndex(-1);
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
        <button onClick={toggleDone}>Filter checked</button>
      </form>
      <span>Progress bar</span>
      <ul>
        {taskList.map((task, i) => {
          return (
            <div key={i} className="todo__listWrapper">
              {editIndex === i ? (
                <input
                  type=" text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditText(e.target.value)
                  }
                />
              ) : (
                <li className="todo__list">{task.text}</li>
              )}
              {editIndex === i ? (
                <button onClick={() => editTodo(i)}>Submit editted task</button>
              ) : (
                <button onClick={() => setEditIndex(i)}>Edit task</button>
              )}
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
function setTodoEditing(i: number): void {
  throw new Error("Function not implemented.");
}
