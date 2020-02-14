'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Please enter a title"
        },
        notNull:{
          msg:"Please enter a title"
        }
      }
    },
    CategoryId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Please enter a category"
        },
        notNull:{
          msg:"Please enter a category"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User)
    Task.belongsTo(models.Category)
  };
  return Task;
};