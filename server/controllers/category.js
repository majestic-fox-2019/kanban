const {Category, Task} = require('../models/index')

class CategoryController {
    static getCategory(req, res, next) {
        Category
            .findAll({
                include : [{
                    model: Task,
                    where: {
                        ProjectId: req.params.id
                    },
                    required: false
                }],
                order: [['id', 'ASC']]
            })
            .then(categories => {
                res.status(200).json(categories)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static postCategory(req, res, next) {
        res.status(200).json('post category')
    }

    static putCategory(req, res, next) {
        res.status(200).json('put category')
    }

    static deleteCategory(req, res, next) {
        res.status(200).json('delete category')
    }
}

module.exports = CategoryController