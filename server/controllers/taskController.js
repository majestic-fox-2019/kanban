"use strict"

const { Task } = require('../models')

class TaskController {
    static create(req, res, next) {
        const { title } = req.body
        const body = {
            title
        }
        Task.create(body)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }

    static findByPk(req, res, next) {
        Task.findByPk(req.params.id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }


    static findAll(req, res, next) {
        Task.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Task.destroy({ where: { id: req.params.id } })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }


    static takeAssign(req, res, next) {
        const body = {
            assignTo: req.userEmail,
            UserId: req.userId,
            category: 'todo'
        }
        Task.update(body, {
            where: { id: req.params.id }, returning: true,
            plain: true
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static declineAssign(req, res, next) {
        const body = {
            assignTo: null,
            UserId: null,
            category: 'back-log'
        }
        Task.update(body, { where: { id: req.params.id } })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }



    static update(req, res, next) {
        const { title } = req.body
        const body = {
            title
        }
        Task.update(body, {
            where: { id: req.params.id }, returning: true,
            plain: true
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }


    static updateCategory(req, res, next) {
        // console.log('okkk')
        Task.update({ category: req.body.category }, {
            where: { id: req.params.id }, returning: true,
            plain: true
        })
            .then(task => {
                res.status(200).json(task)
            })
            .catch(next)
    }


}

module.exports = TaskController