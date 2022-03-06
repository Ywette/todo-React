import React from 'react';
import {FaRegCheckCircle, FaRegEdit, FaTrashAlt} from "react-icons/fa";
import {ListItemProp} from "../interfaces";

const TaskList = (props: any) => {
    const toggledFilter = props.toggledFilter;

    return (
        <div>
            {toggledFilter.map((listItem: ListItemProp, index: number) => {
                return (
                    <div className="taskItem-wrapper" key={index}>
                        {listItem.text}
                        <FaRegEdit
                            // onClick={()=>editTodo(index)}
                        />
                        <FaRegCheckCircle
                            onClick={() => props.checkIfDone(index)}
                            style={{
                                backgroundColor: `${
                                    listItem.completed ? "green" : "transparent"
                                }`
                        }}
                        />
                        <FaTrashAlt
                            className="todo__trashIcon"
                            onClick={() => props.deleteTask(index)}
                        />
                    </div>
                )
            })}
        </div>
    );
};

export default TaskList;