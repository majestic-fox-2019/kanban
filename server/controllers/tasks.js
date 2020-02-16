const { Task, User } = require('../models')
const errors = require('http-errors')

class ControllerTask {
  static taskAll(req, res, next) {
    Task
      .findAll({
        include: [
          { model: User }
        ],
        order: [['updatedAt', 'DESC']]
      })
      .then(taskResult => {
        res.status(200).json(taskResult)
      })
      .catch(err => {
        next(err)
      })
  }

  static createTask(req, res, next) {
    let { title, description, status, category } = req.body
    Task
      .create({
        title,
        description,
        status,
        category,
        UserId: req.user.id
      })
      .then(result => {
        req.io.emit('createTask')
        res.status(201).json(result)
      })
      .catch((err) => {
        if (err.message != 0) {
          err.statusCode = '400'
        } else {
          err.statusCode = '500'
        }
        next(err)
      })
  }

  static findTask(req, res, next) {
    let id = req.params.id
    Task
      .findOne({ where: { id: id }, returning: true })
      .then(result => {
        if (result) {
          req.io.emit('findTask')
          res.status(200).json(result)
        } else {
          let err = {
            statusCode: '404',
            message: 'Not Found'
          }
          next(err)
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static updateOne(req, res, next) {
    let id = req.params.id
    let { category } = req.body

    Task
      .update({ category }, { where: { id: id }, returning: true })
      .then(result => {
        if (result[1]) {
          req.io.emit('updateOne')
          res.status(200).json(result[1][0])
        } else {
          let err = {
            statusCode: '404',
            message: 'Not Found'
          }
          next(err)
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static updateAll(req, res, next) {
    let id = req.params.id
    let { title, description, status } = req.body
    Task
      .update({ title, description, status }, { where: { id: id }, returning: true })
      .then(resultupdate => {
        if (resultupdate[1]) {
          req.io.emit('updateAll')
          res.status(200).json(resultupdate[1][0])
        } else {
          let err = {
            statusCode: '404',
            message: 'Not Found'
          }
          next(err)

        }
      })
      .catch(err => {
        next(err)
      })
  }


  static deleteTask(req, res, next) {
    let id = req.params.id
    let isi = null
    Task
      .findOne({ where: { id: id } })
      .then(result => {
        isi = result
        return Task.destroy({ where: { id: id }, returning: true })
      })
      .then(resultDestroy => {
        req.io.emit('deleteDestroy')
        if (resultDestroy > 0) {
          res.status(200).json(isi)
        } else {
          let err = {
            statusCode: '404',
            message: 'Not Found'
          }
          next(err)
        }
      })
      .catch(err => {
        console.log(err, 'ini dari controller error')
        next(err)
      })
  }



}

module.exports = ControllerTask