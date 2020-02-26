const express   = require('express')
const router    = express.Router()

const ProjectsController = require('../controllers/ProjectsController');

router.get('/', ProjectsController.list);
router.post('/', ProjectsController.add);
router.put('/:id', ProjectsController.update);
router.delete('/:id', ProjectsController.delete);

module.exports = router