"use strict"

const routes = require("express").Router()
const UserRouter = require("./user")
const KanbanRouter = require("./kanban")

routes.use("/users", UserRouter)
routes.use("/kanbans", KanbanRouter)

module.exports = routes