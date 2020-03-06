const Task = require('../models').Task;
const User = require('../models').User;
const axios = require('axios');

class TaskController{
    static create(req,res,next){
        console.log(req.body)
        console.log(req.query)

        axios({
            url : ' https://neutrinoapi.net/bad-word-filter',
            method : 'post',
            headers : {
                'user-id' : 'JPetra',
                'api-key' : 'LoPY50W0V43NXp1HGj3T8Pbxv9Rb4j3ljptr2MSvFqwd4dnJ'
            },
            data : {
                content : req.body.title+" "+req.body.desc,
                'output-case' : 'camel' 
            }
        })
        .then(({data})=>{
            if(data.isBad === true){
                next('profanity')
                return
            } else {
                const body = {
                    title : req.body.title,
                    category : req.body.category,
                    status : req.body.status,
                    UserId : req.user.id
                }
        
                Task.create(body)
                .then(response => {
                    console.log(response)
                    res.status(200).json(response)
                })
                .catch(err => {
                    console.log(err)
                    next(err)
                })
            }
        })
        .catch(err=> {
            console.log(err)
        })

    }
    
    static read(req,res,next){
        Task.findAll({
            include : [{
                model : User,
                attributes : ['email'],
            }],
            where : {
                '$User.email$' : req.user.email
            }
        })
        .then(response => {
            console.log(response)
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            next(400)
        })
    }

    static readOne(req,res,next){
        Task.findByPk(req.params.id,
            {
            include : [{
                model : User,
                attributes : ['email']
            }]
        })
        .then(response => {
            if(!response){
                next('task-not-found')
            }else{
                res.status(200).json(response)
            }
        })
        .catch(err => {
            console.log(err)
            next(400)
        })
    }

    static update(req,res,next){
        Task.update(req.body,{
            where : {
                id : req.params.id
            }
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            next(400)
        })
    }

    static delete(req,res,next){
        let condition = {
            id : req.params.id
        }

        if(Object.keys(req.query).length > 0){
            condition.ProjectId = req.query.ProjectId
        }

        Task.destroy({
            where : condition
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            next(400)
        })
    }

}

module.exports = TaskController