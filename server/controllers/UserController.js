"use strict"

const { User } = require('../models')

class UserController {

    static login (req, res, next){
        const { email, password } = req.body

        User
        .findAll({
            where:{
                email: email,
                password: password
            }
        })
        .then(result=>{
            if (result) {
                if (result.length!==0) {
                    res.status(200).json(result)
                }
                else{
                    // res.send("sini?")
                    throw {
                        statusCode: 404,
                        msg: "Wrong password or Username"
                    }
                    
                }
            
            } 
        })
        .catch(err=>{
            next(err)
        })
    }

    static register (req, res, next){
        const { username, email, password } = req.body
        const post = {
            username,
            email,
            password
        }
        User
        .create(post)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })
        
    }


    static users (req, res, next){
        User
        .findAll()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })
        
    }

}

module.exports=UserController