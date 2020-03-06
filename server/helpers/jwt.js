const jwt = require('jsonwebtoken');

function tokenSigner(payload){
    console.log('Entered tokenSigner')
    let token = jwt.sign(payload,'Jovi123')
    console.log('token : '+token)
    return token
}

function tokenVerifier(token){
    console.log('entered tokenVerifier')
    let user = jwt.verify(token,'Jovi123')
    console.log('user from token : '+user)
    return user
}

module.exports = {
    tokenSigner,
    tokenVerifier
};
