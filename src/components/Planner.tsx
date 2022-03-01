import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaRegCheckCircle } from "react-icons/fa";
import ProgressBar from "@ramonak/react-progress-bar";
import FilterBar from "./FilterBar";
import { ListItemProp } from '../interfaces';
import Button from '../components/Button'


const getLocalStorage = () => {
    let list = localStorage.getItem("list");
    if (list) {
        return (list = JSON.parse(localStorage.getItem("list") || ""));
    } else {
        return [];
    }
};

const deadline = ["today", "this week", "this month"];

const TodoList = () => {
    const [taskList, setTaskList] = useState<ListItemProp[]>(getLocalStorage());

    const [taskInput, setTaskInput] = useState("");

    const [tags, setTags] = useState(""); // can be separate variable

    const [editIndex, setEditIndex] = useState<number>(-1);
    const [editText, setEditText] = useState<string>("");
    const [actions, setActions] = useState(false);

    const [checkedTaskList, setCheckedTaskList] = useState();


    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(taskList));
    }, [taskList]);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (taskInput === "") {
            alert("please write a task");
        } else {
            const newTask: ListItemProp = {
                text: taskInput,
                completed: false,
                deadline: ""
            }
            setTaskList([...taskList, newTask])
            setTaskInput('')
            console.log(taskList)
        }
    };

    const clearAll = () => {
        setTaskList([]);
    };

    const deleteTask = (i: number) => {
        const filtered = taskList.filter((task, index) => index !== i);
        setTaskList([...filtered]);
    };

    // const checkIfDone = (index: number) => {
    //     const editedTask = [...taskList];
    //     taskList[index].completed = !taskList[index].completed;
    //     setTaskList(editedTask);
    // };

    // const addDeadlineTag = (index: number, tad: string)=>{
    //   const editedTask = [...taskList];
    //   setTaskList()
    // }

    const toggleDone = () => {
        setActions(true);
    };

    const returnData = () => {
        setActions(false);
    };

    const addTag = (tag: string) => {
        setTags(tag);
    };

    const editTodo = (i: number) => {
        const updatedTodos = [...taskList].map((taskListItem, index) => {
            if (index === i && editText !== "") {
                taskListItem.text = editText;
                taskListItem.deadline = tags;
            }
            return taskListItem;
        });

        setTaskList(updatedTodos);
        setEditText("");
        setEditIndex(-1);
        console.log(taskList);
    };

    const returnDeadline = (tag: string) => {
        //style buttons

        const deadlineTasks = [...taskList].filter((task) => tag === task.deadline);
        setTaskList(deadlineTasks);
    };

    const progress = (): number => {
        const progressDone = taskList.filter((doneTask) => doneTask.completed);
        return parseInt(
            `${Math.round((progressDone.length * 100) / taskList.length)}`
        );
    };
    //not finished

    const newArr = taskList.filter((listItem) => {
        if (actions) {
            return listItem.completed;
        }
        if (tags === "today"){
            return listItem.deadline
        }
        return true;
    });

    return (
        <div className="todo">
            <form className="todo__form">
                <input
                    placeholder="Add a task..."
                    type="text"
                    value={taskInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTaskInput(e.target.value)
                    }
                />

                {/*<Button*/}
                {/*    type="button"*/}
                {/*    className="button"*/}
                {/*    value="add a task"*/}
                {/*    onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}*/}
                {/*/>*/}
                {taskInput ?
                    <div>
                        <button
                            type="submit"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}
                        >
                            add a task
                        </button>
                    </div>
                    : null
                }

            </form>
            <button onClick={clearAll}>clear all</button>
            <FilterBar deadlineTags={deadline} />

            {/*{actions ? (*/}
            {/*    <button onClick={returnData}>Show all tasks</button>*/}
            {/*) : (*/}
            {/*    <button onClick={toggleDone}>Filter checked</button>*/}
            {/*)}*/}

            {/*<button onClick={clearAll}>Clear</button>*/}

            {/*<div className="deadline">*/}
            {/*    <span>filter by deadline</span>*/}
            {/*    {deadline.map((tag, index) => {*/}
            {/*        return (*/}
            {/*            <button*/}
            {/*                key={index}*/}
            {/*                onClick={() => returnDeadline(tag)}*/}
            {/*                style={{ backgroundColor: "#EFEFEF" }}*/}
            {/*            >*/}
            {/*                {tag}*/}
            {/*            </button>*/}
            {/*        );*/}
            {/*    })}*/}
            {/*    <button onClick={returnData}>see all tasks</button>*/}
            {/*</div>*/}

            {/*<span>your progress</span>*/}
            {/*{taskList.length > 0 && <ProgressBar completed={progress()} />}*/}

            <ul>
                {taskList.map((listItem, index) => {
                    return (
                            <li key={index}>
                                {listItem.text}

                                <FaTrashAlt
                                    className="todo__trachIcon"
                                    onClick={() => deleteTask(index)}
                                />
                            </li>
                        )
                })}
            </ul>
        </div>
    );
};

export default TodoList;
