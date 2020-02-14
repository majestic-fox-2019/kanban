"use strict"

const { Kanban } = require("../models")

class kanbanController {
    static createKanban(req, res, next) {
        const { title, assignTo, description } = req.body
        Kanban.create({
            title,
            assignTo,
            description,
            category: "back-log",
            UserId: req.user.id,
        })
            .then((kanban) => {
                res.status(201).json(kanban)
            }).catch(next);
    }
    static findAll(req, res, next) {
        Kanban.findAll()
            .then((kanban) => {
                res.status(200).json(kanban)
            })
            .catch(next);
    }
    static findOne(req, res, next) {
        Kanban.findOne({
            where: {
                id: req.params.id
            }
        })
            .then((kanban) => {
                if (!kanban) {
                    next(createError(404, "not found Kanban"))
                } else {
                    res.status(200).json(kanban)
                }
            }).catch(next);
    }
    static update(req, res, next) {
        const { title, category, assignTo, description } = req.body
        console.log('harusnya ga tembus kesini')
        Kanban.update({
            title,
            category,
            assignTo,
            description,
            updatedAt: new Date()
        }, {
            where: {
                id: req.params.id
            }
        })
            .then((kanban) => {
                if (kanban[0] === 0) {
                    next(createError(404, "not found Kanban"))
                } else {
                    return Kanban.findOne({
                        where: {
                            id: req.params.id
                        }
                    })
                        .then((kanban) => {
                            res.status(200).json(kanban)
                        }).catch(next);
                }
            }).catch(next);
    }
    static remove(req, res, next) {
        let result = null
        Kanban.findOne({
            where: {
                id: req.params.id
            }
        })
            .then((kanban) => {
                result = kanban.dataValues
                if (kanban[0] === 0) {
                    next(createError(404, "not found Kanban"))
                } else {
                    return Kanban.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                        .then(() => {
                            res.status(200).json(result)
                        })
                }
            }).catch(next);
    }
}

module.exports = kanbanController