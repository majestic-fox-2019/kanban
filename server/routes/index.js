const IndexRouter = require('express').Router()
const ProjectRouter = require('./project')
const UserRouter = require('./user')
const UserController = require('../controllers/user')
const Authentication = require('../middlewares/authentication')

IndexRouter.post('/login', UserController.login)
IndexRouter.post('/google', UserController.onSignIn)
IndexRouter.post('/register', UserController.register)
IndexRouter.use(Authentication)
IndexRouter.use('/users', UserRouter)
IndexRouter.use('/projects', ProjectRouter)

module.exports = IndexRouter