const { Project, UserProject } = require('../models')

function taskAuthorization(req, res, next) {
  const userID = req.loggedIn.id
  const projectId = req.params.projectId
  console.log(userID, projectId)
  UserProject.findOne({ where: { ProjectId: projectId, UserId: userID } })
    .then(result => {
      if (!result) {
        throw { code: 403, msg: 'Sorry, you are not authorized' }
      } else {
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}

function projectAuthorization(req, res, next) {
  console.log('Masuk project authorization')
  const userID = req.loggedIn.id
  Project.findOne({ where: { id: req.params.projectId, owner: userID } })
    .then(result => {
      if (!result) {
        throw { errCode: 403, msg: 'Sorry, you are not authorized' }
      } else {
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = { taskAuthorization, projectAuthorization }
