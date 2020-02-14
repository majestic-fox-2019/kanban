const bcrypt = require('bcrypt');

function compare(password,hash){
  return bcrypt.compare(password, hash)
}

module.exports = {compare}