'use strict';
module.exports = (sequelize, DataTypes) => {

  const {Model} = sequelize.Sequelize

  class Task extends Model {}
  
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title is empty"
        },
        notNull: {
          args: true,
          msg: "Title is empty"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description is empty"
        },
        notNull : {
          args: true,
          msg: "Description is empty"
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Category is empty"
        },
        notNull: {
          msg: "Category is empty"
        }
      }
    },
    ProjectId: DataTypes.INTEGER,
  }, {sequelize});

  Task.associate = function(models) {
    Task.belongsTo(models.Project)
  };
  return Task;
};