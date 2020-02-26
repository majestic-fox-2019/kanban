'use strict'

const { Todo } = require('../models')

class TodoController {
    static create(req, res, next) {
        const { title, description } = req.body;
        const UserId = req.userLoggedIn.id
        const email = req.userLoggedIn.email
        Todo.create({
            title,
            category: 'backlog',
            description,
            assignedTo: email,
            UserId
        })
        .then(todoCreated => {
            res.status(201).json(todoCreated)
        })
        .catch(next)
    }

    static readAll(req, res, next) {
        Todo.findAll()
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(next)
    }

    static readOne(req, res, next) {
        const id = req.params.id
        Todo.findByPk(id)
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(next)
    }

    static update(req, res, next) {
        const { title, description } = req.body
        const id = req.params.id
        Todo.update(
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
        Todo.update(
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
        Todo.destroy({
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

module.exports = TodoController