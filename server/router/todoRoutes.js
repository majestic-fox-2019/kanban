const routes = require('express').Router()
const controlTodo = require("../controllers/todoController")
const authentication = require('../middlewares/authenticate')

routes.get("/all/mine", authentication, controlTodo.getMine)

module.exports = routes