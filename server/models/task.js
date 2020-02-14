'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Task extends Model { }

  Task.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Title is required!'
        }
      }
    },
    CategoryId: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Category is required!'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    },
    description : {
      type : DataTypes.STRING
    },
    ProjectId : {
      type : DataTypes.INTEGER
    }
  }, { sequelize })

  Task.associate = function (models) {
    Task.belongsTo(models.User)
    Task.belongsTo(models.Category)
    Task.belongsTo(models.Project)
  };
  return Task;
};