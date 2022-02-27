const mongoose = require('mongoose')
const { Project } = require('../models');

function addProject(project) {

    return Project.create(project);
}

function verifyProject(project) {
    return {
        projectName: project.projectName,
        taskList: (project.taskList) ? project.taskList.map((task, index) => {
            return {
                taskName: task.taskName,
                isDone: (task.isDone === 'true') ? true : false
            }
        }) : {},
        memberList: (project.memberList) ? project.memberList.map((member, index) => {
            return {
                memberName: member.memberName,
                isKicked: (member.isKicked === 'true') ? true : false,
                isLeader: (member.isLeader === 'true') ? true : false,
            }
        }) : {},
        isDeleted: (project.isDeleted === 'true') ? true : false,
        _id : project._id
    }

}

function findProjects(props = {}) {
    return Project.find(props)
}


function handleNotFound(req, res) {
    const parsedUrl = url.parse(req.url, true)
    res.statusCode = 404
    res.end(`Route ${parsedUrl.pathname} not found.`)
}

function deleteByID(id) {
    return Project.deleteOne({ _id: id });
}

function updateProjectByID(_id, update) {
    return Project.findByIdAndUpdate(_id, update);
}


module.exports = { addProject, verifyProject, findProjects, deleteByID, handleNotFound, updateProjectByID }