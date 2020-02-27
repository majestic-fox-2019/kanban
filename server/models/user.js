'use strict';

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please input name'
        },
        notNull: {
          msg: 'Please input name'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Please input valid email address'
        },
        notEmpty: {
          msg: 'Please input email'
        },
        notNull: {
          msg: 'Please input email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please input password'
        },
        notNull: {
          msg: 'Please input password'
        },
        len:{
          args:[6,32],
          msg:"Minimum 6 characters required in password"
        }
      }
    },
  }, { sequelize, hooks: {
    beforeCreate: (user, options)=> {
      let hash = bcrypt.hashSync(user.password, 10)
      user.password = hash
    }
  } })
  
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task)
  };
  return User;
};