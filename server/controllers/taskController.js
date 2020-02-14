const { Task, User } = require('../models')

class TaskController {
    static create(req, res, next){
        Task.create({
            title: req.body.title,
            category: 'Back-Log',
            UserId: null,
            ProjectId: req.body.projectId
        })
        .then((createdTask) => {
            res.status(201).json(createdTask)
        })
        .catch(err => {
            next(err)
        })
    }

    static findAllTask(req, res, next) {
        Task.findAll({
            where: {
                UserId: req.loggedUser.id,
                ProjectId: null
            }
        })
        .then(userTasks => {
            res.status(200).json(userTasks)
        })
        .catch(err => {
            next(err)
        })
    }

    static findOne(req, res, next) {
        Task.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(taskData => {
            res.status(200).json(taskData)
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next){
        Task.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            next(err)
        })
    }

    static updateOne(req, res, next){
        Task.update({
            title: req.body.title
        },{
            where: {
                id: req.params.id
            },
            returning: true
        })
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(err => {
            next(err)
        })
    }

    static changeCategoryNext(req, res, next){
        let data = {
            category: req.body.status
        }
        Task.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(taskData => {
            if (taskData.category == 'Back-Log') {
                data.UserId = req.loggedUser.id
                return
            } else {
                return
            }
        })
        .then(() => {
            return Task.update(data,{
                where: {
                    id: req.params.id
                },
                returning: true
            })
        })
        .then(categoryUpdated => {
            res.status(200).json(categoryUpdated)
        })
        .catch(err => {
            next(err)
        })
    }

    static changeCategoryPrev(req, res, next){
        let data = {
            category: req.body.status
        }
        Task.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(taskData => {
            if (taskData.category == 'To-Do') {
                data.UserId = null
                return
            } else {
                return
            }
        })
        .then(() => {
            return Task.update(data,{
                where: {
                    id: req.params.id
                },
                returning: true
            })
        })
        .then(categoryUpdated => {
            res.status(200).json(categoryUpdated)
        })
        .catch(err => {
            next(err)
        })
    }

    static findProjectTasks(req, res, next) {
        Task.findAll({
            where: {
                ProjectId: req.params.projectId
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'email']
                }
            ]
        })
        .then(projectTasks => {
            res.status(200).json(projectTasks)
        })
        .catch(err => {
            next(err)
        })
    }

}

module.exports = TaskController