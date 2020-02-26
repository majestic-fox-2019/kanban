const { User, Task, Project, ProjectUser } = require('../models')

function task(req, res, next){
    Task.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(result => {
        if(!result) {
            throw ({
                statusCode: 404,
                message: 'Task not found'
            })
        }else if (req.loggedUser.id !== result.UserId && result.UserId !== null ) {
            throw ({
                statusCode: 401,
                message: 'You are not authorized to access this task'
            })
        } else {
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}

function project (req, res, next) {
    let projectId = req.params.projectId || req.body.projectId || req.targetTask
    // console.log(req.targetTodo)
    ProjectUser.findOne({
        where: {
            UserId: req.loggedUser.id,
            ProjectId: projectId
        }
    })
    .then(projectData => {
        if(projectData){
            next()
        } else {
        throw ({
            statusCode: 401,
            message: 'You are not authorized to access this project'
        })
        }
    })
    .catch(err => {
        next(err)
    })
}

function projectTask(req, res, next) {   
    Task.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(taskData => {
        req.targetTask = taskData.ProjectId
        next()
    })
    .catch(err => {
        next(err)
    })
}

function deleteProject(req, res, next) {
    ProjectUser.findOne({
        where: {
            UserId: req.loggedUser.id,
            ProjectId: req.params.id
        },
        include: [{ model: Project }]
    })
    .then(projectData => {
        if(projectData.Project.projectLeader !== req.loggedUser.id){
            throw ({
                statusCode: 401,
                message: 'Only project leaders are allowed to delete project'
            })
        } else {
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = {
    task,
    project,
    projectTask,
    deleteProject
}