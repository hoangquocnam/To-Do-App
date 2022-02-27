const { addProject, verifyProject, findProjects, deleteByID, handleNotFound, updateProjectByID } = require('./projects.helpers')
const { insertUser, findUsers, findUserById, removeUserById, updateUserById, verifyUser, hashPassword } = require('./user.helpers')
const jwt = require('jsonwebtoken')
const { handleError } = require('../helper');
const mongoose = require('mongoose')
const axios = require("axios")
function handleAuthResponse(response, isSuccessful = false, message = '#') {
    const data = {
        status: isSuccessful ? 'success' : 'fail',
        message: message
    }
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(data));
}


function handleDataResponse(response, data) {
    response.statusCode = 200;
    response.end(JSON.stringify(data));
}

function createProject(request, response) {
    const project = verifyProject(request.body);
    addProject(project)
        .then((projectAdded) => {
            handleAuthResponse(response, true, JSON.stringify(projectAdded._id));
        })
        .catch(err => {
            handleError(err, 'controllers/index.js', 'createProject')
            handleAuthResponse(response, false);
        })
}

function getProjects(request, response) {
    let project = verifyProject(request.body);
    if (project.projectName === undefined) project = {};
    findProjects(project)
        .then(foundProjects => {
            if (!foundProjects) {
                throw new Error('Unknow Projects')
            }
            else {
                const projects = foundProjects.filter(project => (project.isDeleted != true));
                handleDataResponse(response, projects);
            }
        })
        .catch((error) => {
            handleError(error, '../controllers/index.js', 'getProjects');
            handleAuthResponse(response, false);
        })
}

function deleteProject(request, response) {
    const { _id } = request.body;
    updateProjectByID(_id, { isDeleted: true }).then(() => {
        handleAuthResponse(response, true)
    })
}

function updateProjectAddTaskByID(request, response) {
    const { taskName, isDone, projectID, isDeleted } = request.body;
    findProjects({ _id: projectID })
        .then(foundProject => {
            try {
                if (foundProject) {
                    const project = foundProject[0];
                    let taskList = project.taskList;
                    const newid = mongoose.Types.ObjectId();
                    taskList.push(
                        {
                            taskName: (taskName),
                            isDone: isDone,
                            isDeleted: isDeleted,
                            _id: newid,
                        });
                    updateProjectByID(projectID, { taskList: taskList }).then((project) => {
                        handleDataResponse(response, newid);
                    })
                }
            } catch (e) {
                handleError(error, '../controllers/index.js', 'updateProjectDoneTaskByID');
                handleAuthResponse(response, false);
            }
        })
}

function updateProjectDoneTaskByID(request, response) {
    const { projectID, taskID } = request.body;
    findProjects({ _id: projectID })
        .then((foundProject) => {
            const project = foundProject[0];
            project.taskList.forEach(task => {
                if (task._id.equals(taskID)) {
                    task.isDone = task.isDone ? false : true;
                }
            });
            updateProjectByID(project, { taskList: project.taskList }).then(() => {
                handleAuthResponse(response, true);
            })
        })
}

function updateProjectDeleteTaskByID(request, response) {
    const { projectID, taskID } = request.body;
    findProjects({ _id: projectID })
        .then((foundProject) => {
            const project = foundProject[0];
            project.taskList.forEach(task => {
                if (task._id.equals(taskID)) {
                    task.isDeleted = task.isDeleted ? false : true;
                }
            });
            updateProjectByID(project, { taskList: project.taskList }).then(() => {
                handleAuthResponse(response, true);
            })
        })
}

function signUp(request, response) {
    const user = request.body;
    insertUser(user)
        .then((userAdded) => {
            const data = {
                status: 'success',
                _id : userAdded._id
            }
            handleDataResponse(response, data)
        })
        .catch(err => {
            handleError(err, 'controllers/index.js', 'signUp')
            handleAuthResponse(response, false)
        })
}

function getUsers(request, response) {
    response.setHeader('Content-Type', 'application/json');
    findUsers()
        .then(foundUsers => {
            if (!foundUsers) {
                throw new Error('Unknown Users')
            }
            else {
                handleDataResponse(response, foundUsers);
            }
        })
        .catch((error) => {
            handleError(error, '../controllers/index.js', 'getUsers');
            handleAuthResponse(response, false);
        })
}

function getUser(request, response) {
    const id = request.body;
    
    response.setHeader('Content-Type', 'application/json');
    findUserById(id)
        // .then((data) => {
        //     response.end(JSON.stringify(data))
        // })
        .then(foundUser => {
            if (!foundUser) {
                throw new Error('Unknow User')
            }
            else {
                handleDataResponse(response, foundUser);
            }
        })
        .catch((error) => {
            handleError(error, '../controllers/index.js', 'getUsers');
            handleAuthResponse(response, false);
        })
}

function deleteUser(request, response) {
    const { _id } = request.body;
    updateUserById(_id, { isDeleted: true }).then(() => {
        handleAuthResponse(response, true)
    })
        .catch(err => {
            handleError(err, 'controllers/index.js', 'deleteUser')
            handleAuthResponse(response, false)
        })

}

function editUser(request, response) {
    const update = request.body;
    
    updateUserById(update._id, { name: update.name, age: update.age, gender: update.gender, isAdmin: update.isAdmin }).then(() => {
        handleAuthResponse(response, true)
    })
        .catch(err => {
            handleError(err, 'controllers/index.js', 'deleteUser')
            handleAuthResponse(response, false)
        })
}

function logIn(request, response) {
    const checkingUser = request.body
    response.setHeader('Content-Type', 'application/json');
    findUsers().then(users => {
        if (!users) {
            throw new Error('Failed to get users')
        }
        let user = users.find(user => user.username === checkingUser.username && user.password === hashPassword(checkingUser.password));
        if (user) {
            const token = jwt.sign({ userId: user.id },
                'RANDOM_TOKEN_SECRET'
            )
            const data = {
                status: 'success',
                token: token,
                account: {
                    username: user.username,
                    name: user.name,
                    age: user.age,
                    gender: user.gender
                }
            }
            handleDataResponse(response, data)
        }
        else {
            handleAuthResponse(response, false)
        }

    }).catch(err => {
        handleError(err, 'controllers/index.js', 'LogIn')
        response.statusCode = 404
        response.end('Username or password is not correct.')
    })
}


module.exports = {
    createProject,
    getProjects,
    deleteProject,
    updateProjectAddTaskByID,
    updateProjectDoneTaskByID,
    updateProjectDeleteTaskByID,
    signUp,
    getUsers,
    getUser,
    deleteUser,
    editUser,
    logIn
}