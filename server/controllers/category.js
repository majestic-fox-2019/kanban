const {Category} = require('../models')
const {Task} = require('../models')

class CategoryController {
  
  static list(req, res, next){
    Category.findAll({where: { UserId: req.user.id }, order: [['id', 'ASC']], include: Task})
    .then(category => {
      res.status(200).json(category)
    })
    .catch(error => {
      next(error)
    })
  }

  static add(req, res, next){
    let addCategory = {
      title: req.body.title,
      UserId: req.user.id
    }

    Category.create(addCategory)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => {
      next(error)
    })
  }

  static update(req, res, next){
    let CategoryId = {
      where: {
        id: req.params.id
      }
    }

    let updateCategory = {
      title: req.body.title
    }

    Category.update(updateCategory, CategoryId)
    .then(result => {
      res.status(200).json(updateCategory)
    })
    .catch(error => {
      
    })
  }

  static delete(req, res,next){
    let taskLength = 0
    let categoryId = {
      where: {
        id: req.params.id
      }
    }

    let taskId = {
      where: {
        CategoryId: req.params.id
      }
    }

    let categoryData = Category.findByPk(req.params.id)
    let destroyCategory = Category.destroy(categoryId)
    let destroyTask = Task.destroy(taskId)
    Promise.all([categoryData, destroyCategory, destroyTask])
    .then(result => {
      res.status(200).json(result[0])
    })
    .catch(error => {
      res.send(error)
    })
  }
}

module.exports = CategoryController