function showError(err, req, res, next){
    res.send(err)
}

module.exports=showError