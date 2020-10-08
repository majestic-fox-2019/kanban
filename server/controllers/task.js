"use strict"
const { Task } = require("../models")

class taskController {
    static create (req, res, next) {
        console.log(req.params.id)
        const id = req.id
        Task.create({
            userId: id,
            title: req.body.title,
            category: "Backlog"
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static getAll (req, res, next) {
        console.log("masuk get all")
        Task.findAll()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static getOne (req, res, next) {
        res.status(200).json(req.task)
    }

    static update (req, res, next) {
        console.log(req.params.id)
        Task.update({
            title: req.body.title,
            category: req.body.category
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            res.status(200).json({title: req.body.title, category: req.body.category})
        })
        .catch(next)
    }
    static delete (req, res, next) {
        const taskDetail = req.task
        Task.destroy({
            where:{
                id: req.params.id
            }
        })
        .then(result => {
            res.status(200).json(taskDetail)
        })
        .catch(next)
    }
}

module.exports = taskController