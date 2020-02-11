const IndexRouter = require('express').Router()
const CategoryRouter = require('./category')
const UserRouter = require('./user')
const TaskRouter = require('./task')
const UserController = require('../controllers/user')
const Authentication = require('../middlewares/authentication')

IndexRouter.post('/login', UserController.login)
IndexRouter.post('/register', UserController.register)
IndexRouter.use(Authentication)
IndexRouter.use('/user', UserRouter)
IndexRouter.use('/category', CategoryRouter)
IndexRouter.use('/task', TaskRouter)

module.exports = IndexRouter