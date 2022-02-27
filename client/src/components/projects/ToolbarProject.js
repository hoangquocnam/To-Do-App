import React, { useState, useEffect } from "react";
import Button from "./button";
import { postMethod } from '../../api'

function ToolbarProject(props) {
    const {
        setProjectList,
    } = props

    const [project, setProject] = useState('')

    function cancelTask() {
        setProject('');
    }

    function handleSubmit() {

        if (project) {
            const newProject = {
                projectName: project,
                taskList: [],
                memberList: [],
                isDeleted: false
            }
            postMethod('add-project', newProject)
                .then(
                    response => {
                        newProject._id = JSON.parse(response.data.message);
                        setProjectList(prev => {
                            return [...prev, newProject]
                        });
                    }
                )

            cancelTask();
        }
    }


    return (
        <div id="ToolbarProject">
            <input
                id="addProject__field"
                onChange={e => setProject(e.target.value)}
                value={project}
                onKeyPress={(e) => {
                    if (e.key == "Enter")
                        handleSubmit()
                }
                }
                placeholder = 'Enter project...'
            >
            </input>

            <Button
                className='gg-add'
                handleOnClick={handleSubmit}
            />

            <Button
                className='gg-refresh-r'
                handleOnClick={cancelTask}
            />
        </div>
    )
}

export default ToolbarProject