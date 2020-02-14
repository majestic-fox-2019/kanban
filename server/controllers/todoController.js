const { todo } = require('../models/index')

module.exports = class {
  static create(req, res, next) {
    let {
      creator,
      creatorImg,
      title,
      content,
      assignTo,
      assignToImg,
      assignToUid
    } = req.body
    todo
      .create({
        status: 'backlog',
        creator,
        creatorImg,
        title,
        content,
        assignTo,
        assignToImg,
        assignToUid
      })
      .then(newTodo => {
        res.status(201).json(newTodo)
      })
      .catch(err => {
        res.status(400).json(err)
        console.log(err)
      })
  }

  static delete(req, res, next) {
    let { id } = req.params
    todo
      .destroy({
        where: {
          id
        }
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static findOne(req, res, next) {
    let { id } = req.params
    todo
      .findOne({
        where: {
          id
        }
      })
      .then(todoResult => {
        res.status(200).json(todoResult)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static findAll(req, res, next) {
    let { id } = req.params
    todo
      .findAll()
      .then(todoResult => {
        res.status(200).json(todoResult)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static updateStatus(req, res, next) {
    let { id } = req.params
    let { status } = req.body
    todo
      .update(
        {
          status
        },
        {
          where: {
            id
          },
          returning: true,
          plain: true
        }
      )
      .then(todoResult => {
        res.status(200).json(todoResult)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static update(req, res, next) {
    let { id } = req.params
    let { title, content } = req.body
    todo
      .update(
        {
          title,
          content
        },
        {
          where: {
            id
          },
          returning: true,
          plain: true
        }
      )
      .then(todoResult => {
        res.status(200).json(todoResult)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
}
