'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  const bcrypt = require('bcrypt');
  class User extends Model{

  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Please enter a name"
        },
        notNull:{
          msg:"Please enter a name"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        isEmail: {
          msg:"Format email wrong"
        },
        notNull:{
          msg:"Please enter a name"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Please enter a password"
        },
        notNull:{
          msg:"Please enter a name"
        }
      }
    }
  }, {
    sequelize,
    hooks:{
      beforeCreate(user,option) {
        return bcrypt
                .hash(user.password, 10)
                .then(hash => {
                  user.password = hash
                })
      },
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task)
  };
  return User;
};