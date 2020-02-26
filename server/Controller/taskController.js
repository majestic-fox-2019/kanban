const {Task} = require('../models')

class taskController{

    static create(req,res,next){
        Task.create({
            title:req.body.title,
            description:req.body.description,
            category:req.body.category,
            UserId:req.user.id
        })
        .then(data=>{
            req.io.emit("live")
            res.status(201).json(data)
        })
        .catch(err=>{
            if(err.message != 0){
                err.StatusCode = 400
            }
            next(err)
        })
    } 

    static list(req,res,next){
        Task
        .findAll()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>[
            next(err)
        ])
    }

    static delete(req,res,next){
        let isi = null
        Task
        .findOne({where:{id:req.params.id}})
        .then(data=>{
             console.log(data)
            if(data){
                return Task.destroy({where:{id:req.params.id}})
            }
            else{
                let msg= {
                    StatusCode :'404',
                    message:'command not found'
                }
                next(msg)
            }
        })
        .then(data=>{
                req.io.emit("live")
                res.status(200).json(isi)
            
        })
        .catch(err=>{
            next(err)
        })
    }

    static update(req,res,next){
        console.log(req.params.id)
        Task
        .update({title:req.body.title,description:req.body.description,category:req.body.category},{
            where: { id: req.params.id},
            returning: true
          })
        .then(data=>{
            // res.send(data)
            if(data[0] != 0){
                req.io.emit("live")
                res.status(200).json(data[1][0])
            }
            else{
                let msg= {
                    StatusCode :'404',
                    message:'command not found'
                }
                next(msg)
                // throw createError(404,'Error 404,command not found')

            }
        })
        .catch(err=>{
            if(err.message != 0){
                err.StatusCode = 400
            }
            next(err)
        })
    }

}

module.exports = taskController