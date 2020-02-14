'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class ProjectUser extends Model{}

  ProjectUser.init({
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
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please fill in all fields'},
        notEmpty: {
          msg: 'Please fill in all fields'
        }
      }
    }
  },{
    sequelize
  })

  ProjectUser.associate = function(models) {
    ProjectUser.belongsTo(models.User)
    ProjectUser.belongsTo(models.Project)
  };
  return ProjectUser;
};