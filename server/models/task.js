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
    CategoryId: DataTypes.INTEGER,
    UserId:DataTypes.INTEGER
  }, {sequelize});

  Task.associate = function(models) {
    Task.belongsTo(models.Category)
    Task.belongsTo(models.User)
  };
  return Task;
};