import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaRegCheckCircle } from "react-icons/fa";
import ProgressBar from "@ramonak/react-progress-bar";

type Task = {
  text: string;
  completed: boolean;
  tag: string;
};

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list") || ""));
  } else {
    return [];
  }
};

const deadlineTags = ["today", "this week", "this month"];

const TodoList = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState<Task[]>(getLocalStorage());
  const [tags, setTags] = useState(""); // can be separate variable
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [editText, setEditText] = useState<string>("");
  const [actions, setActions] = useState(false);
  // const [actionByTag, setActioByTag] = useState("");

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(taskList));
  }, [taskList]);

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
          tag: "",
        },
      ]);
      setTask("");
    }
  };

  const clearAll = () => {
    setTaskList([]);
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

  const toggleDone = () => {
    setActions(true);
  };

  const addTag = (tag: string) => {
    console.log(tag);
    setTags(tag);
    const addedTag = [...taskList].map((task, item) => {
      console.log(task);
    });
  };

  const editTodo = (i: number) => {
    const updatedTodos = [...taskList].map((taskListItem, index) => {
      if (index === i || editText !== "") {
        taskListItem.text = editText;
        taskListItem.tag = tags;
      }
      console.log("from edit taskITem ", taskListItem);
      return taskListItem;
    });

    setTaskList(updatedTodos);
    setEditText("");
    setEditIndex(-1);
  };

  const returnDeadline = () => {
    //filter by tag
    console.log(taskList);
  };

  const returnData = () => {
    setActions(false);
  };

  const progress = (): number => {
    const progressDone = taskList.filter((doneTask) => doneTask.completed);

    return parseInt(
      `${Math.round((progressDone.length * 100) / taskList.length)}`
    );
  };

  const newArr = taskList.filter((listItem) => {
    if (actions) {
      return listItem.completed;
    } else {
      return true;
    }
  });

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
      </form>

      {actions ? (
        <button onClick={returnData}>Show all tasks</button>
      ) : (
        <button onClick={toggleDone}>Filter checked</button>
      )}
      <button onClick={clearAll}>Clear</button>

      <div className="deadline">
        <span>filter by deadline</span>
        <button onClick={returnDeadline}>Today</button>
        <button onClick={returnDeadline}>This week</button>
        <button onClick={returnDeadline}>This month</button>
      </div>

      <span>your progress</span>
      {taskList.length > 0 && <ProgressBar completed={progress()} />}

      <ul>
        {newArr.map((task, i) => {
          return (
            <div key={i} className="todo__listWrapper">
              {editIndex === i ? (
                <div className="input-style">
                  <input
                    className="input"
                    placeholder="edit task..."
                    type=" text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setEditText(e.target.value);
                    }}
                  />
                  {deadlineTags.map((tag) => {
                    return (
                      <span
                        key={tag}
                        className="tag"
                        onClick={() => addTag(tag)}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
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
