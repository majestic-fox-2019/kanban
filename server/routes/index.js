const express = require('express')
const router = express.Router()
const user = require('./user')
const task = require('./task')
const category = require('./category')
const {authentication} = require('../middlewares/auth')

router.use(user)
// authentication,
router.use("/task",authentication,task)
router.use("/category",authentication,category)
module.exports = router