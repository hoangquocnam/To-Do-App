import React, { useState } from "react"
import Task from "../task";
import ToolbarTask from "./ToolbarTask";

function DetailTaskList(props) {

    const {
        projectID,
        fetchedTaskList
    } = props

    const [taskList, setTaskList] = useState(fetchedTaskList);

    return (
        <div className="detailTaskList">

            <ToolbarTask
                setTaskList={setTaskList}
                projectID={projectID}
            />

            <ul className="taskList">
                {taskList.map((task, index) => {
                    if (!task.isDeleted) {
                        return (
                            <Task
                                nameTask={task.taskName}
                                projectID={projectID}
                                status={task.isDone}
                                isDeleted={task.isDeleted}
                                key={index}
                                id={task._id}
                            />
                        )
                    }
                })}
            </ul>
        </div>
    )
}

export default DetailTaskList