const express = require('express')
const router = express.Router()
const registerRoute = require('./register')
const loginRoute = require('./login')
const taskRoute = require('./task')
// const projectRoute = require('./project')
const auth = require('../middlewares/authentication')
// const taskCreation = require('../middlewares/taskCreation')

router.use('/register', registerRoute)
router.use('/login', loginRoute)

router.use(auth)

// router.use('/project', projectRoute)

// router.use(taskCreation)

router.use('/task', taskRoute)

module.exports = router