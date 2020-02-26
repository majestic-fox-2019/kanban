const { Project, ProjectUser, Task, User } = require('../models')

class ProjectController {

    static findAllProjects(req, res, next) {
        ProjectUser.findAll({
            where: {
                UserId: req.loggedUser.id
            },
            include: [
                {
                    model: Project
                },{
                    model: User,
                    attributes: ['id', 'email']
                }
            ]
        })
        .then(userProjects => {
            res.status(200).json(userProjects)
        })
    }

    static findProjectTasks(req, res, next){
        Task.findAll({
            where: {
                ProjectId: req.params.id
            },
            include: [
                {
                    model: Project
                }
            ]
        })
        .then(projectData => {
            res.status(200).json(projectData)
        })
        .catch(err => {
            next(err)
        })
    }

    static create(req, res, next) {
        Project.create({
            name: req.body.name,
            projectLeader: req.loggedUser.id
        })
            .then(createdProject => {
                return ProjectUser.create({
                    ProjectId: createdProject.id,
                    UserId: req.loggedUser.id
                })
            })
            .then(conjuctioncreated => {
                res.status(201).json(conjuctioncreated)
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteProject(req, res, next) {
        ProjectUser.destroy({
            where: {
                ProjectId: req.params.id
            }
        })
            .then(deletedProject => {
                Project.destroy({
                    where: {
                        ProjectId: req.params.id
                    }
                })
            })
            .then(deletedConjunction => {
                Task.destroy({
                    where: {
                        ProjectId: req.params.id
                    }
                })
            })
            .then(deletedTasks => {
                res.status(200).json(deletedTasks)
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = ProjectController