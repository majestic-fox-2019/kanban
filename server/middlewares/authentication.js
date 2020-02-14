const AuthHelper = require('../helper/userAuth')
const createError = require('http-errors')

module.exports = (req, res, next) => {

    try {
        console.log(req.headers.token)
        const token = req.headers.token
        const user = AuthHelper.verifyToken(token)
        req.user = user
        next()
    } catch (error) {
        next(createError(403, { name: 'Authentication', message: { error: 'Invalid Token!' } }))
    }


}