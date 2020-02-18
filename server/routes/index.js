'use strict'

const router = require('express').Router()
const UserController = require('../controllers/UserController')
const TaskRouter = require('./TaskRouter')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googlesignin', UserController.googlesignin)
router.get('/githubsignin', UserController.githubsignin)
router.post('/githubsigninOk', UserController.githubsigninOk)

router.use('/tasks', TaskRouter)

module.exports = router