"usse strict"

const express = require("express")
const route = express.Router()
const auth = require("../middleWares")
const taskController = require("../controllers/task")

route.use(auth.authentication)
route.post("/", taskController.create)
route.get("/", taskController.getAll)
route.get("/:id",auth.authorization,taskController.getOne)
route.put("/:id", auth.authorization, taskController.update)
route.delete("/:id",  auth.authorization, taskController.delete)

module.exports = route