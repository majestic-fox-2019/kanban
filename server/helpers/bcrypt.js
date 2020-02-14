const bcrypt = require('bcrypt')
const saltRounds = 10

function hash(password) {
    return new Promise ((res, rej) => {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function(err, hashedPassword) {
                if (err) {
                    rej(err)
                } else {
                    res(hashedPassword)
                }
            })
        })
    })
}

function comparePass(password, hashedPassword) {
    return new Promise ((res, rej) => {
        bcrypt.compare(password, hashedPassword, function (err, result) {
            if(err) {
                rej(err)
            } else {
                res(result)
            }
        })
    })
}

module.exports = {
    hash,
    comparePass
}