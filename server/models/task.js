'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  
  class Task extends Model {}

  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please input title'
        },
        notNull: {
          msg: 'Please input title'
        }
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please input category'
        },
        notNull: {
          msg: 'Please input category'
        },
        isIn: {
          args: [['Backlog', 'Development', 'Production', 'Done']]
        }
      },
    },
    UserId: DataTypes.INTEGER
  }, { sequelize })

  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User)
  };
  return Task;
};