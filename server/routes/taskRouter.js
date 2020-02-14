var express = require('express')
var router = express.Router()
let TaskController = require('../controllers/TaskController')


router.get('/allTasks',TaskController.read)
router.get('/',TaskController.getAllData)
router.post('/add',TaskController.add)
router.put('/:id',TaskController.update)
router.delete('/:id',TaskController.destroy)


module.exports = router
