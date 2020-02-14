module.exports = function (err, req, res, next)
    {
        if(err.StatusCode){
            console.log("masukkkk")
            console.log(err)
            res.status(err.StatusCode).json(err)
    }
    else{
        res.status(500).send('server is error')
    }
}