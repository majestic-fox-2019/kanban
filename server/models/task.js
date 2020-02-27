'use strict'
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Task extends Model {}
  Task.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      assigned_to: DataTypes.STRING,
      status: DataTypes.STRING,
      ProjectId: DataTypes.INTEGER
    },
    { sequelize }
  )
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.Project)
  }
  return Task
}
