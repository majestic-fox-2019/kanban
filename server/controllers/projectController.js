const modelProject = require("../models").Project
const modelProjectUser = require("../models").ProjectUser
const modelTodo = require("../models").Todo
const modelUser = require("../models").User
const axios = require("axios")
class ControlProject {
    static createProject(req, res, next) {
        let project
        let { name } = req.body
        modelProject.create({
            name
        })
            .then(projectCreated => {
                project = projectCreated
                return modelProjectUser.create({
                    UserId: req.payload.id,
                    ProjectId: projectCreated.id
                })
            })
            .then(allDone => {
                res.status(201).json({ allDone, project })
            })
            .catch(err => {
                next(err)
            })
    }
    static addTodoProject(req, res, next) {
        let { title } = req.body
        // console.log(due_date, "<<<<<<<<<<<<")
        let ProjectId = req.params.idProject
        let UserId = req.payload.id
        modelTodo.create({
            title,
            status: "Backlog",
            ProjectId,
            UserId
        })
            .then(todoProjectCreated => {
                res.status(200).json(todoProjectCreated)
            })
            .catch(err => {
                next(err)
            })

    }

    static editTodoProject(req, res, next) {
        let { title, status } = req.body
        let UserId = req.payload.id
        let ProjectId = req.ProjectId
        modelTodo.update({
            title,
            status,
            UserId,
            ProjectId
        }, { where: { id: req.params.idTodo }, returning: true })
            .then(todoUpdated => {
                res.status(200).json(todoUpdated)
            })
            .catch(err => {
                next(err)
            })
        // axios({
        //     method: "GET",
        //     url: "https://calendarific.com/api/v2/holidays?api_key=f61563882dc999ad8463027c0d1b6db64c082e85&country=ID&year=2020"
        // })
        //     .then(hasilnya => {
        //         let holidays = hasilnya.data.response.holidays
        //         let libur = []
        //         for (let j of holidays) {
        //             if (j.date.iso == due_date) {
        //                 libur.push(j.name)
        //             }
        //         }
        //         if (libur.length > 0) {
        //             next({ code: 400, message: `ada libur ${libur[0]} pada hari due date` })
        //         } else {
        //             modelTodo.update({
        //                 title, status, due_date, UserId, ProjectId
        //             }, { where: { id: req.params.idTodo }, returning: true })
        //                 .then(todoUpdated => {
        //                     if (todoUpdated.length > 0) {
        //                         res.status(200).json(todoUpdated)
        //                     } else {
        //                         next({ code: 404, message: "id todo not found" })
        //                     }
        //                 })
        //                 .catch(err => {
        //                     next(err)
        //                 })
        //         }
        //     })
        //     .catch(err => {
        //         next(err)
        //     })


    }

    static deleteTodoProject(req, res, next) {
        let data
        modelTodo.findOne({ where: { id: req.params.idTodo } })
            .then(dataFound => {
                if (dataFound) {
                    data = dataFound
                    return modelTodo.destroy({ where: { id: req.params.idTodo } })
                } else {
                    next({ code: 404, message: "id todo not found" })
                }
            })
            .then(deleted => {
                res.status(200).json({ data, deleted })
            })
            .catch(err => {
                next(err)
            })
    }

    static addMember(req, res, next) {
        let useridnya
        // console.log(req.body.email, "<<ini email")
        modelUser.findOne({ where: { email: req.body.email } })
            .then(userFound => {
                useridnya = userFound.dataValues.id
                if (userFound) {
                    // console.log("masuk user found", userFound.dataValues, "<<<<<<")
                    return modelProjectUser.findOne({
                        where: {
                            ProjectId: req.ProjectId,
                            UserId: userFound.dataValues.id
                        }
                    })
                } else {
                    next({ code: 404, message: "User not found" })
                }
            })
            .then(userJoined => {
                // console.log(userJoined, "<<<<<<<<<<<<<<<<<<<<<<")
                if (userJoined) {
                    next({ code: 400, message: "User have already in this project" })
                } else {
                    // console.log("masuk else di karena belom join")
                    return modelProjectUser.create({
                        UserId: useridnya,
                        ProjectId: req.ProjectId
                    })
                        .then(projectUserCreated => {
                            // console.log("masuk user Joined akhirnya")

                            res.status(201).json(projectUserCreated)
                        })
                }
            })

            .catch(err => {
                next(err)
            })
    }

    static getMyProjects(req, res, next) {
        modelProjectUser.findAll({ where: { UserId: req.payload.id }, include: [modelProject] })
            .then(allMyProjects => {
                if (allMyProjects) {
                    res.status(200).json(allMyProjects)
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static allProject(req, res, next) {
        modelProjectUser.findAll({ include: [modelProject, modelUser] })
            .then(allProjects => {
                res.status(200).json(allProjects)
            })
            .catch(err => {
                next(err)
            })
    }

    static allTodoInProject(req, res, next) {
        modelTodo.findAll({ where: { ProjectId: req.params.idProject } })
            .then(allTodosfound => {
                res.status(200).json(allTodosfound)
            })
            .catch(err => {
                next(err)
            })
    }

    static getAllMemberinProject(req, res, next) {
        modelProjectUser.findAll({ where: { ProjectId: req.params.idProject }, include: modelUser })
            .then(allMembers => {
                res.status(200).json(allMembers)
            })
            .catch(err => {
                next(err)
            })
    }

    static getProjectName(req, res, next) {
        modelProject.findOne({ where: { id: req.params.id } })
            .then(ketemu => {

                res.status(200).json(ketemu)
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteProject(req, res, next) {
        let projectIdnya
        modelProject.findOne({ where: { id: req.params.idProject } })
            .then(projectFound => {
                if (projectFound) {
                    projectIdnya = projectFound
                    return modelProjectUser.destroy({ where: { ProjectId: projectIdnya.id } })
                } else {
                    next({ code: 404, message: "Project Not Found" })
                }
            })
            .then(() => {
                return modelTodo.destroy({ where: { ProjectId: projectIdnya.id } })
            })
            .then(() => {
                return modelProject.destroy({ where: { id: req.params.idProject } })
            })
            .then(() => {
                res.status(200).json({ message: `Yay! Project ${projectIdnya.name} has been successfully deleted!` })
            })
            .catch(err => {
                next(err)
            })

    }

    static getProjectById(req, res, next) {
        modelProject.findOne({ where: { id: req.params.idProject } })
            .then(ketemu => {
                if (ketemu) {
                    res.status(200).json(ketemu)
                } else {
                    next({ code: 404, message: "project not found" })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ControlProject