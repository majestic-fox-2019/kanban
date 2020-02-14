const express = require('express')
const router = express.Router()
const category = require('../controllers/category')

router.post('/',category.create)
router.delete('/:id',category.delete)

module.exports = router