"use strict"

const jwt = require("../helpers")
const { Task } = require("../models")

async function authentication (req, res, next){
    const bearerHeader = req.headers['authorization']
    if(!bearerHeader){
        next ({code:403, message: "need token"})
    }else {
        const bearer = bearerHeader.split(" ")
        const token = bearer[1]
        try {
            const verify = await jwt.verify(token)
            req.id = verify.idUser
            next()
        } catch (err) {
            next({code:403, message: err})
        }
    }
}

function authorization(req, res, next) {
    Task.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(result => {
        if(!result) next ({code: 404, message: "the task is not found or already destroy"})
        if(result.userId !== req.id) next ({code: 404, message: "you dont have access to delete or edit this task "})
        req.task = result
        next()
    })
    .catch(next)
}
module.exports = {
    authentication,
    authorization
}


