const route = require('express').Router()
const taskController = require('../controllers/task')
const userController = require('../controllers/user')
const authentication = require('../middlewares/authentication')
const authorisation = require('../middlewares/authorisation')

route.post('/register', userController.register)
route.post('/login', userController.login)
route.post('/login-google', userController.googleSignIn)

route.get('/tasks', taskController.getAll)
route.get('/tasks/:id', taskController.getOne)
route.post('/tasks',authentication, taskController.adding)
route.delete('/tasks/:id',authentication, authorisation, taskController.deleting)
// route.put('/tasks/:id',authentication, authorisation, taskController.updating)

route.put('/tasks/next/:id', authentication, authorisation, taskController.updatingNext)
route.put('/tasks/back/:id', authentication, authorisation, taskController.updatingBack)

route.get('/users',  userController.getAllUser)
route.post('/remind-friend', authentication, userController.sendReminding)

module.exports = route