const route = require('express').Router()
const taskController = require('../controllers/task')
const userController = require('../controllers/user')
const authentication = require('../middlewares/authentication')
const authorisation = require('../middlewares/authorisation')

route.post('/register', userController.register)
route.post('/login', userController.login)

route.get('/tasks', taskController.getAll)
route.get('/tasks/:id', taskController.getOne)
// route.post('/tasks',authentication, taskController.adding)
// route.delete('/tasks/:id',authentication, authorisation, taskController.deleting)
// route.put('/tasks/:id',authentication, authorisation, taskController.updating)

route.post('/tasks', taskController.adding)
route.delete('/tasks/:id',taskController.deleting)
route.put('/tasks/next/:id', taskController.updatingNext)
route.put('/tasks/back/:id', taskController.updatingBack)

module.exports = route