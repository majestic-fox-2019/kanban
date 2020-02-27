const { Project, Task, UserProject, User } = require('../models')
const sendEmail = require('../helpers/mail')

class ProjectController {
  static getUserProjects(req, res, next) {
    const id = req.loggedIn.id
    const personal = []
    const other = []
    UserProject.findAll({
      where: { UserId: id, status: 'join' },
      include: [{ model: Project, attributes: ['name', 'owner'] }]
    })
      .then(results => {
        if (results.length == 0) {
          throw { code: 404, msg: 'You dont have any project yet' }
        } else {
          results.forEach(el => {
            if (id == el.Project.owner) {
              personal.push(el)
            } else {
              other.push(el)
            }
          })
          res.status(200).json({
            personal: personal,
            other: other
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static getDetailProject(req, res, next) {
    const id = req.params.projectId
    let data = null
    UserProject.findAll({
      where: { ProjectId: id, status: 'join' },
      include: [
        { model: Project, attributes: ['id', 'name', 'owner'] },
        { model: User, attributes: ['name', 'email'] }
      ]
    })
      .then(results => {
        if (results.length == 0) {
          throw { code: 404, msg: 'Project doesnt exist' }
        } else {
          let temp = {
            id: results[0].Project.id,
            name: results[0].Project.name,
            owner: results[0].Project.owner,
            members: []
          }
          results.forEach(el => {
            temp.members.push(el.User)
          })
          data = temp
          res.status(200).json({
            data
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static createProject(req, res, next) {
    const data = {
      name: req.body.name,
      owner: req.loggedIn.id
    }
    let projectData
    Project.create(data)
      .then(result => {
        projectData = result
        return UserProject.create({
          UserId: data.owner,
          ProjectId: result.id,
          status: 'join'
        })
      })
      .then(final => {
        res.status(201).json({
          result: projectData,
          msg: 'New Project Created'
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteProject(req, res, next) {
    const id = req.params.projectId
    Project.destroy({ where: { id: id } })
      .then(response => {
        return UserProject.destroy({ where: { ProjectId: id } })
      })
      .then(final => {
        return Task.destroy({ where: { ProjectId: id } })
      })
      .then(result => {
        res.status(200).json({
          msg: 'Project Deleted'
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static inviteMember(req, res, next) {
    const id = req.params.projectId
    const email = req.body.email
    let data
    User.findOne({ where: { email: email } })
      .then(result => {
        if (!result) {
          throw { code: 404, msg: 'User doesnt exist' }
        } else {
          data = {
            UserId: result.id,
            ProjectId: id,
            status: 'pending'
          }
          return UserProject.findOne({
            where: { UserId: result.id, ProjectId: id }
          })
        }
      })
      .then(response => {
        if (response) {
          throw { code: 400, msg: 'User already on this project' }
        } else {
          return UserProject.create(data)
        }
      })
      .then(final => {
        sendEmail(email)
        res.status(201).json({
          result: final,
          msg: 'User invited'
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static getInvitation(req, res, next) {
    const id = req.loggedIn.id
    UserProject.findAll({
      where: { UserId: id, status: 'pending' },
      include: [{ model: Project, attributes: ['name'] }]
    })
      .then(results => {
        if (results.length == 0) {
          throw { code: 404, msg: 'You dont have any invitation yet' }
        } else {
          res.status(200).json(results)
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static acceptInvitation(req, res, next) {
    const data = {
      UserId: req.loggedIn.id,
      ProjectId: req.params.projectId
    }
    UserProject.findOne({ where: data })
      .then(result => {
        if (!result) {
          throw { code: 404, msg: 'Project not found or has been deleted' }
        } else {
          return UserProject.update({ status: 'join' }, { where: data })
        }
      })
      .then(response => {
        res.status(200).json({
          result: response,
          msg: 'Invitation Accepted'
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static leaveProject(req, res, next) {
    const data = {
      UserId: req.loggedIn.id,
      ProjectId: req.params.projectId
    }
    UserProject.destroy({ where: data })
      .then(result => {
        return Task.update(
          { status: 'backlog', assigned_to: null },
          {
            where: {
              assigned_to: req.loggedIn.email,
              ProjectId: data.ProjectId
            }
          }
        )
      })
      .then(final => {
        res.status(200).json({
          result: final,
          msg: 'You leave the project'
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ProjectController
