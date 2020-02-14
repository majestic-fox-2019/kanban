"use strict"

const express = require("express")
const route = express.Router()
const userRoute = require("./user")
const taskRoute = require("./task")

route.use('/users', userRoute)
route.use('/tasks', taskRoute)
module.exports= route