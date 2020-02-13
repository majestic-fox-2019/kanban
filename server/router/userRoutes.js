const routes = require('express').Router()
const controlUser = require("../controllers/userController")

routes.post("/register", controlUser.register)
routes.post("/login", controlUser.login)
routes.get("/:id", controlUser.getUserById)
routes.post("/google", controlUser.google)
routes.post("/facebook", controlUser.facebook)
routes.post("/twitter", controlUser.twitter)
routes.post("/github", controlUser.github)

module.exports = routes