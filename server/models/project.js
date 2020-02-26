'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize;
  class Project extends Model {}
  
  Project.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Project's name cannot be empty!"
        }
      }
    }
  }, {
    sequelize
  })

  Project.associate = function(models) {
    // associations can be defined here
    Project.hasMany(models.Task)
  };
  return Project;
};