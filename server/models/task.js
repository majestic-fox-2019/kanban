'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Task extends Model {}

  Task.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title must be filled"
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Category must be filled"
        }
      }
    },
    UserId: {
      type : DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "UserId must be filled"
        }
      }
    }
  },
  {
    sequelize
  })
  
  Task.associate = function(models) {
    Task.belongsTo(models.User)
  };

  return Task;
};