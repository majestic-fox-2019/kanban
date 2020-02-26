const {User} = require('../models/index')
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken')

class userController{
    static Register(req,res,next){
        User
        .create({email:req.body.email,username:req.body.username,password:req.body.password})
        .then(user=>{
            let token = jwt.sign({email:user.email,id:user.id},process.env.secret_key)
            res.status(201).json({token:token,id:user.id})
            // res.status(201).json(data)
        })
        .catch(err=>{
            if(err.message){
                err.StatusCode = 400
            }
            next(err)
        })
    }

    static Login(req,res,next){
        let email =req.body.email
        let password = req.body.password
        User
        .findOne({where:
            {
                email:email
            }})
        .then(user=>{
            if(user){
                if(bcrypt.compareSync(password, user.password)){
                    let token = jwt.sign({email:user.email,id:user.id},process.env.secret_key)
                    res.status(201).json({token:token,id:user.id})
                }
                else{
                    let msg= {
                        StatusCode :'404',
                        message:'Username or password wrong'
                    }
                    // next(msg)
                    console.log('erornya disini', msg);
                    
                res.status(401).json(msg)
                }
            }
            else{
                let msg= {
                    StatusCode :'404',
                    message:'command not found'
                }
                console.log('erornya ini', msg);
                
                res.status(404).json(msg)
                // next(msg)
            }
        })
        .catch(err=>{
            if(err.message){
                err.StatusCode = 400
            }
            next(err)
        })
    }

    static googleLogin(req,res,next){
        User
        .findOne({
            where:{email:req.payload.email}
        })
        .then(data=>{
            if(!data){
                return User.create({
                            username:req.payload.given_name,
                            name:req.payload.name,  
                            email:req.payload.email,
                            password:"user"
                        })
            }
            else{
                let token = jwt.sign({email:data.email,id:data.id},process.env.secret_key)
                res.status(201).json({token:token,id:data.id})
            }
        })
        .then(data=>{
            // console.log(data)
            let token = jwt.sign({email:data.email,id:data.id},process.env.secret_key)
            res.status(201).json({token:token,id:data.id})
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}

module.exports= userController