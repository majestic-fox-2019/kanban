"use strict"

module.exports = function (err , req, res, next) {
    console.log(err)
    if(err.name === 'SequelizeValidationError'){
        let errorName = []
        err.errors.forEach(error => {
            errorName.push(error.message)
        })
        res.status(400).json({message: errorName.join(', ')})
    } else if(err.code !== null){
        res.status(err.code).json({message: err.message})
    } else if(err.name === 'SequelizeDatabaseError'){
        res.status(500).json({message: err.parent})
    }  
}