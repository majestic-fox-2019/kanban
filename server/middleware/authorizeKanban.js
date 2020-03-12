"use strict"

const { Kanban } = require("../models")
const createError = require('http-errors')

function authorized(req, res, next) {
    Kanban.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(kanban => {
            if (!kanban) {
                next(createError(404, "data not found"))
            } else if (kanban.assignTo === req.user.name) {
                next()
            } else {
                next(createError(401, "Unauthorized"))
            }
        })
        .catch(next)
}

module.exports = authorized