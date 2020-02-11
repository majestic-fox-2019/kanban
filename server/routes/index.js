const IndexRouter = require('express').Router()
const ProjectRouter = require('./project')
const UserRouter = require('./user')
const TaskRouter = require('./task')
const UserController = require('../controllers/user')
const Authentication = require('../middlewares/authentication')

IndexRouter.post('/login', UserController.login)
IndexRouter.post('/register', UserController.register)
IndexRouter.use(Authentication)
IndexRouter.use('/users', UserRouter)
IndexRouter.use('/projects', ProjectRouter)
IndexRouter.use('/tasks', TaskRouter)

module.exports = IndexRouter