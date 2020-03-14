'use strict'
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class todo extends Model {}

  todo.init(
    {
      status: DataTypes.STRING,
      creator: DataTypes.STRING,
      creatorImg: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.STRING(1000),
      assignTo: DataTypes.STRING,
      assignToImg: DataTypes.STRING,
      assignToUid: DataTypes.STRING
    },
    { sequelize }
  )
  todo.associate = function(models) {
    // associations can be defined here
  }
  return todo
}
