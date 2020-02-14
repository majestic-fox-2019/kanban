'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Task extends Model {}

  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please fill in all fields'},
        notEmpty: {
          msg: 'Please fill in all fields'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please fill in all fields'},
        notEmpty: {
          msg: 'Please fill in all fields'
        },
        isIn: {
          args: [['Back-Log', 'To-Do', 'On-Progress', 'Done']],
          msg: 'category not found'
        }
      }
    },
    ProjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please fill in all fields'},
        notEmpty: {
          msg: 'Please fill in all fields'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  },{
    sequelize
  })
  
  Task.associate = function(models) {
    Task.belongsTo(models.User)
    Task.belongsTo(models.Project)
    // associations can be defined here
  };
  return Task;
};