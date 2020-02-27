'use strict'
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Task extends Model {}

  Task.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Title is required'
          }
        }
      },
      category: {
        type: DataTypes.ENUM,
        values: ['backlog', 'todo', 'onprogress', 'completed'],
        allowNull: false,
        defaultValue: 'backlog',
        validate: {
          notEmpty: {
            msg: 'Category is required'
          }
        }
      },
      UserId: {
        type: DataTypes.INTEGER
      }
    },
    { sequelize }
  )

  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User)
  }
  return Task
}
