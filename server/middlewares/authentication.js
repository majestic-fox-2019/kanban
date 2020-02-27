const jwt = require('../helpers/jwt')
const createErrors = require('http-errors')

module.exports = (req, res, next) => {
    if(req.headers.token){
        try {
            req.user = jwt.verify(req.headers.token)
            next()
        }
        catch {
            throw createErrors(400, 'Invalid Token')
        }
    } else {
        throw createErrors(400, 'Invalid Token')
    }
}