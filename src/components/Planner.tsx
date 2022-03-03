import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaRegCheckCircle, FaRegEdit } from "react-icons/fa";
import ProgressBar from "@ramonak/react-progress-bar";
import FilterBar from "./FilterBar";
import { ListItemProp } from '../interfaces';
import Button from '../components/Button'
import TaskInputForm from "./TaskInputForm";

const getLocalStorage = () => {
    let list = localStorage.getItem("list");
    if (list) {
        return (list = JSON.parse(localStorage.getItem("list") || ""));
    } else {
        return [];
    }
};

const deadline = ["today", "this week", "this month"];

const Planner = () => {
    const [taskList, setTaskList] = useState<ListItemProp[]>(getLocalStorage());
    const [showAddTaskForm, setShowAddTaskForm] = useState(false)

    const [editIndex, setEditIndex] = useState<number>(-1);
    const [editText, setEditText] = useState<string>("");
    const [actions, setActions] = useState(false);

    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(taskList));
        console.log(taskList);
    }, [taskList]);

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

    const returnData = () => {
        setActions(false);
    };

    // const editTodo = (i: number) => {
    //     const updatedTodos = [...taskList].map((taskListItem, index) => {
    //         if (index === i && editText !== "") {
    //             taskListItem.text = editText;
    //             taskListItem.deadline = tags;
    //         }
    //         return taskListItem;
    //     });
    //
    //     setTaskList(updatedTodos);
    //     setEditText("");
    //     setEditIndex(-1);
    // };

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

    // const newArr = taskList.filter((listItem) => {
    //     if (actions) {
    //         return listItem.completed;
    //     }
    //     if (tags === "today"){
    //         return listItem.deadline
    //     }
    //     return true;
    // });

    const dataFromForm = (taskInputs: ListItemProp) => {
        setTaskList([...taskList, taskInputs]);
        setShowAddTaskForm(false);
    }

    return (
        <div className="todo">
            <Button
                className=""
                type="button"
                value="Add the Next Task"
                onClick={()=> setShowAddTaskForm(!showAddTaskForm)}
            />
            <div style={{display:`${showAddTaskForm ? "flex" : 'none'}`}}>
                <TaskInputForm
                    addTaskToList={(taskInputs: ListItemProp)=>dataFromForm(taskInputs)}
                /> 
            </div>
            

            <button onClick={clearAll}>clear all</button>
            {/*<FilterBar deadlineTags={deadline} />*/}

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

                {taskList.map((listItem, index) => {
                    return (
                            <div className="taskItem-wrapper" key={index}>
                                {listItem.text}
                                <FaRegEdit />
                                <FaRegCheckCircle
                                    onClick={() => checkIfDone(index)}
                                    style={{
                                        backgroundColor: `${
                                            listItem.completed ? "green" : "transparent"
                                        }`
                                    }}
                                />
                                <FaTrashAlt
                                    className="todo__trachIcon"
                                    onClick={() => deleteTask(index)}
                                />
                            </div>
                        )
                })}
        </div>
    );
};

export default Planner;
