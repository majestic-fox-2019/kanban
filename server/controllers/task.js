const {Task} = require('../models')
const createError = require('http-errors')

class Controller{
    static findAll(req, res, next){
        Task
        .findAll({
            // where:{UserId:req.user}
        })
        .then(data =>{
            console.log(data)
            if (data.length > 0) {
                res.status(200).json(data)
            } else {
                throw createError(404, 'Data Not Found')
            }
        })
        .catch(err =>{
            next(err)
        })
    }
    static findOne(req, res, next){
        const {id} = req.params
        Task
        .findOne({
            where:{id:id}
        })
        .then(data =>{
            if (data) {
                res.status(200).json(data)
            }else{
                throw createError(404, "Data Not Found")
            }
        })
        .catch(err =>{
            next(err)
        })
    }
    static create(req, res, next){
        
        const {title, CategoryId} = req.body
        Task
        .create({
            title,
            CategoryId,
            // UserId : req.user
            UserId : 1
        })
        .then(data =>{
            res.status(201).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }
    static update(req, res, next){
        const {id} = req.params
        const {title, CategoryId} = req.body
        Task
        .update({
            title, CategoryId
        }, { 
            where:{id:id},
            returning : true
        })
        .then(data =>{
            res.status(200).json(data[1][0])
        })
        .catch(err =>{
            next(err)
        })
    }
    static destroy(req, res, next){
        const {id} = req.params
        const findOne = Task.findOne({where:{id:id}})
        const destroy = Task.destroy({ where:{id:id}})
        Promise.all([findOne, destroy])
        .then(data =>{
            res.status(200).json(data[0])
        })
        .catch(err =>{
            next(err)
        })
    }
}

module.exports = Controller