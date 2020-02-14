const express = require('express');
const router = express.Router();
const Task = require('./task')
const User = require('./user')
const Categories = require('./category')

router.use('/', User)
router.use('/tasks', Task)
router.use('/categories', Categories)
module.exports = router