const bcrypt = require('bcrypt')

function hashPassword(password){
  let salt = 10
  return bcrypt.hashSync(password, salt)
}

function checkPassword(password, hashPass){
  return bcrypt.compareSync(password, hashPass)
}

module.exports = {
  hashPassword,
  checkPassword
}