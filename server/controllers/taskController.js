'use strict'

const { Task } = require('../models/')
const { User } = require('../models')

class TaskController {
    static createTask(req, res, next){
        const { title, category } = req.body
        Task
            .create({
                title,
                category,
                UserId: req.user.id
            })
            .then(task => {
                req.io.emit('dataChanged')
                res.status(201).json(task)
            })
            .catch(next)
    }

    static showAll(req, res, next){
        Task
            .findAll({
                include: [User]
            })
            .then(list => {
                res.status(200).json(list)
            })
            .catch(next)
    }

    static deleteTask(req, res, next){
        let deletedData = ""
        Task
            .findOne({
                where: {
                    id: req.params.id,
                    UserId: req.user.id
                }
            })
            .then(task => {
                deletedData = task
                return task.destroy()
            })
            .then(list => {
                req.io.emit('dataChanged')
                res.status(200).json(deletedData)
            })
            .catch(next)
    }

    static findById(req, res, next){
        Task
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(task => {
                res.status(200).json(task)
            })
            .catch(next)
    }

    static changeTaskCategory(req, res, next){
        let { category } = req.body
        Task
            .update({ category }, {
                where: {
                    id: req.params.id,
                    UserId: req.user.id
                },
                returning: true
            })
            .then(updated => {
                req.io.emit('dataChanged')
                res.status(200).json(updated[1][0])
            })
            .catch(next)
    }
}

module.exports = TaskController