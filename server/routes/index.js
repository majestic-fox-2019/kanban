var express = require('express')
var router = express.Router()

/* GET home page. */
router.use('/todos', require('./todo'))

module.exports = router
