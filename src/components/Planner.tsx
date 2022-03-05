import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaRegCheckCircle, FaRegEdit } from "react-icons/fa";
import ProgressBar from "@ramonak/react-progress-bar";
import FilterBar from "./FilterBar";
import { ListItemProp } from '../interfaces';
import Button from '../components/Button'
import TaskInputForm from "./TaskInputForm";
import {addDays, format, endOfWeek, endOfMonth} from 'date-fns';


const getLocalStorage = () => {
    let list = localStorage.getItem("list");
    if (list) {
        return (list = JSON.parse(localStorage.getItem("list") || ""));
    } else {
        return [];
    }
};

const deadline = ["today", "tomorrow", "this week", "this month"];

const Planner = () => {
    const [taskList, setTaskList] = useState<ListItemProp[]>(getLocalStorage());
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);
    const [toggledFilter, setToggledFilter]=useState<ListItemProp[]>([]);

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

    const progress = (): number => {
        const progressDone = taskList.filter((doneTask) => doneTask.completed);
        return parseInt(
            `${Math.round((progressDone.length * 100) / taskList.length)}`
        );
    };
    //not finished

    const dataFromForm = (taskInputs: ListItemProp) => {
        setTaskList([...taskList, taskInputs]);
        setShowAddTaskForm(false);
    }

    const filterDeadline = (tag: string) => {
        // const deadLineDates = ['tomorrow', 'thisWeek', 'thisMonth']
        const date = new Date();
        const dateFormat = 'yyyy-MM-dd';
        const todayFormatted = format(date, dateFormat);

        const tomorrow = addDays(date, 1);
        const tomorrowFormatted = format(tomorrow, dateFormat);

        const thisWeek = endOfWeek(date, {weekStartsOn: 1});
        const thisWeekFormatted = format(thisWeek, dateFormat);

        const thisMonth = endOfMonth(date);
        const thisMonthFormatted = format(thisMonth, dateFormat);

        if (tag === 'tomorrow') {

            const filteredDeadline = taskList.filter((task) => task.deadline === tomorrowFormatted);
            setToggledFilter([...filteredDeadline]);
            console.log(toggledFilter);

        }else if(tag === 'this week'){

            const filteredDeadline = taskList.filter((task) => task.deadline <= thisWeekFormatted);
            setToggledFilter([...filteredDeadline]);
            console.log(toggledFilter);

        }else if(tag === 'this month'){

            const filteredDeadline = taskList.filter((task) => task.deadline <= thisMonthFormatted);
            setToggledFilter([...filteredDeadline]);
            console.log(toggledFilter);
        }
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

            <FilterBar
                filterDeadline={(tag: string)=>filterDeadline(tag)}
                deadlineTags={deadline}
            />

            {/*<span>your progress</span>*/}
            {/*{taskList.length > 0 && <ProgressBar completed={progress()} />}*/}

            {toggledFilter.map((listItem, index) => {
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
