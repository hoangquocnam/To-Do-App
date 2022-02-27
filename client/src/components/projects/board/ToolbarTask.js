import React, { useState } from 'react'
import Button from '../button';
import { updateMethod } from '../../../api'

function ToolbarTask(props) {
    const [taskInput, setTaskInput] = useState('');

    const {
        setTaskList,
        projectID, 
    } = props

    function handleAddTask() {
        if (taskInput) {
            const newTask = {
                taskName: taskInput,
                isDone: false,
                isDeleted: false,
                projectID: projectID
            }
            updateMethod('add-task', newTask).then(response => {
                newTask._id = response.data;
                setTaskList(prev => [...prev, newTask])
            })
            cancelTask();
        }
    }

    function cancelTask() {
        setTaskInput('');
    }
    return (
        <div >
            <input
                type='text'
                placeholder="Enter task..."
                className="taskInput"
                onChange={e => setTaskInput(e.target.value)}
                value={taskInput}
                onKeyPress={(e) => {
                    if (e.key == "Enter")
                        handleAddTask()
                }}
            >
            </input>

            <Button
                titleValue="Add"
                textColor="#333"
                handleOnClick={handleAddTask}
            />

        </div>
    )
}


export default ToolbarTask