'use strict'

const { Task } = require('../models')

class TaskController {
    static create(req, res, next) {
        const { title, description } = req.body;
        const UserId = req.userLoggedIn.id
        const email = req.userLoggedIn.email
        Task.create({
            title,
            category: 'backlog',
            description,
            assignedTo: email,
            UserId
        })
        .then(task => {
            res.status(201).json(task)
        })
        .catch(next)
    }

    static readAll(req, res, next) {
        Task.findAll()
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(next)
    }

    static readOne(req, res, next) {
        const id = req.params.id
        Task.findByPk(id)
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(next)
    }

    static update(req, res, next) {
        const { title, description } = req.body
        const id = req.params.id
        Task.update(
            {
                title,
                description
            },
            {
                where: {
                    id
                }
            }
        )
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static updateOne(req, res, next) {
        const { category } = req.body
        const id = req.params.id
        Task.update(
            {
                category
            },
            {
                where: {
                    id
                }
            }
        )
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static delete(req, res, next) {
        const id = req.params.id
        Task.destroy({
            where: {
                id
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }
}

module.exports = TaskController