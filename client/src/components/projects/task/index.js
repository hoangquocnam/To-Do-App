import React, { useEffect, useState } from "react";
import { updateMethod } from '../../../api'
import Button from "../button";

function Task(props) {

    const {
        nameTask,
        status,
        id,
        projectID,
    } = props

    const [isDone, setHasDone] = useState(status)
    const [isDeleted, setDeleted] = useState(false)

    function handleDoneTask() {
        updateMethod('done-task', { projectID: projectID, taskID: id }).then((response) => {
            if (response.data.status === 'success') {
                setHasDone(isDone ? false : true)
            }
        })

    }

    function handleDelete() {
        updateMethod('delete-task', { projectID: projectID, taskID: id }).then(response => {
            if (response.data.status === 'success') {
                setDeleted(isDeleted ? 'none' : 'block');

            }
        })
    }



    return (
        <li className={`task`} style={{ display: !isDeleted ? 'flex' : 'none' }}>

            <input
                type="checkbox"
                style={{ width: "20px", marginBottom: '10px' }}
                defaultChecked={isDone}
                onClick={handleDoneTask}
                className='checkbox-round'
            />
            <span
                className="taskName"
                style={{ textDecorationLine: isDone ? 'line-through' : 'none'}}
            >
                {nameTask}
            </span>
            <Button
                titleValue="x"
                textColor="red"
                width='30px'
                height='30px'
                handleOnClick={handleDelete}
            />
        </li>
    )
}

export default Task
