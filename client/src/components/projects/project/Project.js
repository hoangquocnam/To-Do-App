import React, { useState} from "react";
import Button from "../button";
import './project.css'
import DetailBoard from "../board";
import { deleteMethod } from '../../../api'

function Project(props) {

    const {
        nameProject = "#",
        taskList_props = [],
        memberList = [],
        isDeleted = false,
        id,
    } = props

    const [isExpanded, setExpanded] = useState('none');
    const [valueExpandButton, setValueExpandButton] = useState('down');
    const [isRemoved, setRemove] = useState(isDeleted)

    function handleExpand() {
        if (isExpanded == 'none') {
            setExpanded('inline-block')
            setValueExpandButton('up')
        }
        else {
            setExpanded('none')
            setValueExpandButton('down')
        }
    }

    function handleRemove() {
        deleteMethod('delete-project', { _id: id }).then(response => {
            if (response.data.status === 'success' ) setRemove(true);
        })
    }

    return (
        <div className="project"
            style={{ display: isRemoved ? 'none' : 'flex' }}
        >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', height: '60px' }}>
                <Button
                    handleOnClick={handleExpand}
                    className={`gg-chevron-double-${valueExpandButton}-o`}
                >
                </Button>
                <p className="projectName">{nameProject}</p>


                <Button
                    handleOnClick={handleRemove}
                    className='gg-remove'
                />
            </div>

            <DetailBoard
                projectID={id}
                fetchedTaskList={taskList_props}
                isExpanded={isExpanded}
            />


        </div>
    )
}


export default Project
