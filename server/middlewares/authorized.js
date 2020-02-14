module.exports = (req, res, next) =>{
    const {verifyToken} = require('../helpers/verifyToken')
    const {Task} = require('../models')
    const createError = require('http-errors')
    
    try {
        const userToken = verifyToken(req.headers.token)
        const {id} = req.params
        Task
        .findOne({
            where:{
                id: id
            }
        })
        .then(data =>{
            if (!data) {
                throw next(createError(404, 'Data Not Found'))
            }else if (data.UserId === userToken.id) {
                next()
            }else{
                throw next(createError(401, 'Unauthorized'))
            }
        })
    } catch (error) {
        next(error)
    }
}