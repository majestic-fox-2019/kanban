const { Project, Task } = require('../models/index')

class ProjectController {

  static createProject(req, res, next){
    const objValue = {
      project_name : req.body.project_name
    }

    Project
      .create(objValue)
      .then(response => {
        req.io.emit('loadProject')
        res.status(200).json(response)
      })
      .catch(next)
  }

  static readProject(req, res, next){
    Project
      .findAll()
      .then(response => {
        if(response.length > 0){
          res.status(200).json(response)
        }else{
          res.status(200).json('Project is empty!')
        }
      })
  }

  static deleteProject(req, res, next){
    const deleteProject = Project.destroy({ where : { id: req.params.project_id } })
    const deleteTask = Task.destroy({ where : { ProjectId : req.params.project_id } })

    Promise.all([
      deleteProject,
      deleteTask
    ])
    .then(response => {
      res.status(200).json(response)
    })
    .catch(next)
  }

}

module.exports = ProjectController