const { Task, User } = require('../models')

class Controller {
  static create(req, res, next) {
    const data = {
      title: req.body.title
    }
    Task.create(data)
      .then((result) => {
        res.status(201).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static readAll(req, res, next) {
    Task.findAll({
      include: [{ model: User, attributes: ['id', 'email', 'name'] }]
    })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static readOne(req, res, next) {
    Task.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static update(req, res, next) {
    Task.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id,
          UserId: req.userInfo.id
        },
        returning: true,
        plain: true
      }
    )
      .then((result) => {
        res.status(200).json(result[1])
      })
      .catch((err) => {
        next(err)
      })
  }

  static updateCategory(req, res, next) {
    let data

    if (req.task.category == 'todo' && req.body.status == 'undo') {
      data = {
        category: req.body.category,
        UserId: null
      }
    } else {
      data = {
        category: req.body.category,
        UserId: req.userInfo.id
      }
    }
    Task.update(data, {
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    })
      .then((result) => {
        res.status(200).json(result[1])
      })
      .catch((err) => {
        next(err)
      })
  }

  static delete(req, res, next) {
    let task
    Task.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((result) => {
        task = result
        return Task.destroy({
          where: {
            id: req.params.id
          }
        })
      })
      .then(() => {
        res.status(200).json(task)
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = Controller
