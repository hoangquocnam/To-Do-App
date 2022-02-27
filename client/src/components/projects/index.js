import React from "react";
import Project from "./project/Project";
import ToolbarProject from "./ToolbarProject.js";
import './index.css'
import { ProjectContextConsumer } from '../../context/projectContext'


function ProjectManager() {
    return (
        <ProjectContextConsumer>
            {context => {
                return (
                    <React.Fragment>
                        <p id = "project__title">PROJECT MANAGER</p>
                        <ToolbarProject
                            setProjectList={context.setProjectList}
                        />

                        <ul id="projectlist">
                            {context.projectList.map((project, index) => {
                                return (
                                    <Project
                                        nameProject={project.projectName}
                                        taskList_props={project.taskList}
                                        memberList={project.memberList}
                                        isDeleted={project.isDeleted}
                                        id={project._id}
                                        key={index}
                                    />
                                )
                            })}
                        </ul>


                    </React.Fragment>
                )
            }}
        </ProjectContextConsumer>
    )



}

export default ProjectManager;