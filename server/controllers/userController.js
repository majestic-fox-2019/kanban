const User = require('../models').User;
const {comparer} = require('../helpers/bcrypt');
const {tokenSigner} = require('../helpers/jwt');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('92257054271-92ajadq0mo9k5941ooe5b512k0hscjms.apps.googleusercontent.com');


class UserController {
    static register(req,res,next){
        User.create(req.body)
        .then(response => {
            let user = {
                id : response.id,
                email : response.email,
                password : response.password,
            }
            let token = tokenSigner(user)
            res.status(201).json(token)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }
    
    static login(req,res,next){
        User.findOne({
            where : {
                email : req.body.email
            }
        })
        .then(response =>{
            if(!response){
                next('user-not-found')
            } else {
                if(comparer(req.body.password,response.password)){
                    let user = {
                        id : response.id,
                        email : response.email,
                        password : response.password,
                    }
                    let token = tokenSigner(user)
                    res.status(200).json(token)
                } else {
                    next('invalid-password')
                }
            }
        })
    }
    
    static async google(req,res,next){
        let token = req.body.id_token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '92257054271-92ajadq0mo9k5941ooe5b512k0hscjms.apps.googleusercontent.com'
        });
        const email = ticket.getPayload().email;

        User.findOne({
            where : {
                email
            }
        })
        .then(response => {
            if(response){
                let user = {
                    id : response.id,
                    email : response.email,
                    password : response.password,
                }
                let token = tokenSigner(user)
                res.status(200).json(token)
            } else if (!response) {
                User.create({
                    email,
                    password : '1234'
                })
                .then(response => {
                    let user = {
                        id : response.id,
                        email : response.email,
                        password : response.password,
                    }
                    let token = tokenSigner(user)
                    res.status(201).json(token)
                })
                .catch(err => {
                    console.log(err)
                    next(err)
                })
            }
        })
    }
}

module.exports = UserController