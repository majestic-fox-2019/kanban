'use strict';
module.exports = (sequelize, DataTypes) => {

  const bcrypt = require('bcryptjs')
  const salt = bcrypt.genSaltSync(10)

  const { Model } = sequelize.Sequelize

  class User extends Model{}

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  },{sequelize,
  hooks:{
    beforeCreate: function(instance,option){

      const hash =  bcrypt.hashSync(instance.password, salt )
      instance.password = hash
    }
  }
  })
 
  User.associate = function(models) {

    User.hasMany(models.Task)
    // associations can be defined here
  };
  return User;
};