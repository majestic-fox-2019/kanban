'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize;
  class Task extends Model{}

  Task.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Task's title cannot be empty!"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Task's title cannot be empty!"
        }
      }
    },
    UserId: DataTypes.INTEGER,
    ProjectId: DataTypes.INTEGER
  }, {
    sequelize
  })

  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo = models.User;
  };
  return Task;
};