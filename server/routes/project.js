const router = require('express').Router()
const ProjectController = require('../controllers/projectController')
const Authenticate = require('../middlewares/authentication')
const {
  projectAuthorization,
  taskAuthorization
} = require('../middlewares/authorization')

router.get('/', Authenticate, ProjectController.getUserProjects)
router.get('/:projectId', Authenticate, ProjectController.getDetailProject)
router.post('/', Authenticate, ProjectController.createProject)
router.delete(
  '/:projectId',
  Authenticate,
  projectAuthorization,
  ProjectController.deleteProject
)
router.post(
  '/invite/:projectId',
  Authenticate,
  projectAuthorization,
  ProjectController.inviteMember
)
router.patch(
  '/accept/:projectId',
  Authenticate,
  ProjectController.acceptInvitation
)
router.delete(
  '/leave/:projectId',
  Authenticate,
  taskAuthorization,
  ProjectController.leaveProject
)

module.exports = router
