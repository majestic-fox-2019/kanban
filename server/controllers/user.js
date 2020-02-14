const {User} = require('../models')
const createError = require('http-errors')
const {generateToken} = require('../helpers/generateToken')
const comparePassword = require('../helpers/comparePassword')

class Controller{
    static register(req, res, next){
        const {email, password, name, username} = req.body
        User
        .findOne({
            where:{
                email:email
            }
        })
        .then(data =>{
            if(data){
                throw createError(409, 'Email already register')
            }else{
                return User.create({
                    name, username, email, password
                })
            }
        })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }
    
    static login(req, res, next){        
        const { email, password } = req.body
        User
        .findOne({
            where:{email:email}
        })
        .then(data =>{
            
            if (!data) {
                throw createError(404, 'User Not Found') 
            }else{
                if (comparePassword(password, data.password)) {
                    const payload = {
                        id: data.id,
                        username:data.username
                    }
                    const token = generateToken(payload)
                    res.status(200).json({token: token})
                }else{
                    throw createError(401, 'Invalid Email or Password')
                }
            }
        })
        .catch(err =>{
            next(err)
        })
    }
    static loginGoogle(req, res, next){        
        const { email } = req.body
        console.log(email)
        User
        .findOne({
            where:{email:email}
        })
        .then(data =>{
            console.log(data.id)
            if (!data) {
                return User.create({
                    name:email, username:email, email:email, password:email
                })
            }else{

                const payload = {
                    id: data.id,
                    username:data.username
                }
                const token = generateToken(payload)
                res.status(200).json({token: token})
            }
        })
        .catch(err =>{
            next(err)
        })
    }
}

module.exports = Controller