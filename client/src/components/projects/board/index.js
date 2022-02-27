import React from "react"
import DetailTaskList from "./DetailTaskList"


function DetailBoard(props) {
    const {
        projectID,
        fetchedTaskList,
        isExpanded = 'none'
    } = props


    return (
        <div className="detailProject" style={{ display: isExpanded }}>
            <DetailTaskList
                projectID={projectID}
                fetchedTaskList={fetchedTaskList}
            />
        </div>
    )
}

export default DetailBoard