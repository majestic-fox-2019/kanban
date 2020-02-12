function errorHandling(err, req, res, next) {
    try {
        console.log("error handling start.........");
        if (err.errors) {
            let message = err.errors[0].message;
            res.status(400).json({message});
        }else{
            console.log(err);
            res.send("another error in error handling beside validations, err code: 400");
        }
    } catch (error) {
        res.status(500).json({message: `Something went wrong in server side, Error ${error}`});
    }
}

module.exports = errorHandling;