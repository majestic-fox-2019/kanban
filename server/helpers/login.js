"use strict";
const bcrypt = require("bcrypt");

class Login {
  static hashed(myPlaintextPassword, saltRounds) {

    let hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
    console.log(hash);
    return hash;
  }

  static compare(someOtherPlaintextPassword, hash) {
    let compare = bcrypt.compareSync(someOtherPlaintextPassword, hash);
    return compare;
  }
}

module.exports = Login;
