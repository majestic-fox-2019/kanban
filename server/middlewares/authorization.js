const { Task } = require('../models/')
const createError = require('http-errors')

module.exports = (req, res, next) => {
    Task
        .findOne({
            where: {
                id: req.params.id,
                UserId: req.user.id
            }
        })
        .then(auth => {
            if(auth){
                next()
            } else {
                req.io.emit('dataChanged')
                next(createError(403, 'Unauthorized Access'))
            }
        })
        .catch(next)
}