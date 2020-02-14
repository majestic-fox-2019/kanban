'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Project extends Model{}

  Project.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please fill in all fields'},
        notEmpty: {
          msg: 'Please fill in all fields'
        }
      }
    },
    projectLeader: {
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
  
  Project.associate = function(models) {
    // associations can be defined here
  };
  return Project;
};