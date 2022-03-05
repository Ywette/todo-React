import React, {useState} from 'react';
import Input from './Input';
import { ListItemProp } from "../interfaces";
import Button from "./Button";


const TaskInputForm = (props: any) => {

    const [taskInputs, setTaskInputs] = useState<ListItemProp>({
            text: "",
            deadline: "",
    });

    return (
        <form className="">
            <Input
                className=""
                placeholder="Add a task..."
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTaskInputs({...taskInputs, text: e.target.value})
                }
            />

            <Input
                className=""
                placeholder="Add a task..."
                type="date"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTaskInputs({...taskInputs, deadline: e.target.value})
                }
            />

            {/*{(taskInputs.text && taskInputs.deadline) ?*/}
                <div>
                    <button
                        type="button"
                        onClick={(e)=>{
                            e.preventDefault();
                            props.addTaskToList(taskInputs);
                        }}
                    >add a task
                    </button>
                </div>
            {/*    : null*/}
            {/*}*/}
        </form>
    );
};

export default TaskInputForm;