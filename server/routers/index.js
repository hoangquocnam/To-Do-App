const express = require('express')
const router = express.Router();
const { parseRequestBody, authenticate } = require('../middlewares/')
const { createProject,
    getProjects,
    deleteProject, updateProjectAddTaskByID, updateProjectDoneTaskByID, updateProjectDeleteTaskByID, signUp, getUsers, getUser, deleteUser, editUser, logIn } = require('../controllers');
const {logger} =require('../utils/logger')



// >>>>>>>>>>>>>> Middleware
router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader('Access-Control-Allow-Headers', "Authorization")
    logger.info(req.method + '  ->  ' + req.url)
    parseRequestBody(req, res)
    .then(() => next());
})

router.use('/authentication', (req, res, next) => {
    authenticate(req, res).then(() => next());
})


// >>>>>>>>>>>>>> CONTROLLER
//================== GET

router.get('/projects', (req, res) => {
    getProjects(req, res);
})

router.get('/get-users', (req, res) => {
    getUsers(req, res);
})


//================== POST

router.post('/add-project', (req, res) => {
    createProject(req, res)
})

router.post('/sign-up', (req, res) => {
    signUp(req, res)
})

router.post('/get-user', (req, res) => {
    getUser(req, res)
})

router.post('/log-in', (req, res) => {
    logIn(req, res)
})

//================== DELETE

router.delete('/delete-project', (req, res) => {
    deleteProject(req, res)
})

router.delete('/delete-user', (req, res) => {
    deleteUser(req, res)
})

//================== PUT


//================== PATCH

router.patch('/add-task', (req, res) => {
    updateProjectAddTaskByID(req, res)
})

router.patch('/done-task', (req, res) => {
    updateProjectDoneTaskByID(req, res)
})


router.patch('/delete-task', (req, res) => {
    updateProjectDeleteTaskByID(req, res)
})

router.patch('/edit-user', (req, res) => {
    editUser(req, res)
})



module.exports = { router }
