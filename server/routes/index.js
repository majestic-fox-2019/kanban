const router = require('express').Router()
const userRoutes = require('./userRoutes')
const taskRoutes = require('./taskRoutes')
const projectRoutes = require('./projectRoutes')
const authentication = require('../middlewares/authentication')
const isUserExist = require('../middlewares/isUserExist')


router.use('/users', userRoutes)
router.use(authentication)
router.use(isUserExist)
router.use('/projects', projectRoutes)
router.use('/tasks', taskRoutes)

module.exports = router