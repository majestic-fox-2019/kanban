const router = require('express').Router()
const Project = require('../controllers/projectController')

router.get('/', Project.readProject)
router.post('/', Project.createProject)
router.delete('/:project_id', Project.deleteProject)

module.exports = router