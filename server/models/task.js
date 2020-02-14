'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  class Task extends Model{}
  Task.init({
    title: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:"title must be filled"
        },
        notEmpty:{
          args:true,
          msg:"title must be filled"
        }
      }
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:"description must be filled"
        },
        notEmpty:{
          args:true,
          msg:"description must be filled"
        }
      }
    },
    category: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg:"category must be filled"
        },
        notEmpty:{
          args:true,
          msg:"category must be filled"
        }
      }
    },
    UserId: DataTypes.INTEGER
  },{sequelize})  
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User)
  };
  return Task;
};