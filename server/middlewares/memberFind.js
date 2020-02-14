const { User } = require('../models')

module.exports = function(req, res, next){
    User.findOne({
        where: {
            email: req.query.member || req.body.userId
        }
    })
    .then(member => {
        if (!member) {
            throw ({
                statusCode: 404,
                message: 'User not found'
            })
        } else {
            req.query.member = member.id
            req.body.userId = member.id

            next()
        }
    })
    .catch(err => {
        next(err)
    })
}