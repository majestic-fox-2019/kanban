function errorHandler (err, req, res, next){
    if(err.name == 'SequelizeDatabaseError'){
        res.status(500).json({ errors: 'Server currently unable to handle this request'})
    } else {
        res
            .status(err.statusCode || 400)
            .json({ errors: err.message.split('\n')})
    }
}

module.exports = errorHandler