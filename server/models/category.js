'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Category extends Model {}
  
  Category.init({
    nameCategory: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args : true,
          msg: "Username Cannot be null"
        },
        notEmpty: {
          args : true,
          msg: "Username Cannot be empty"
        }
    }
    }}, {sequelize});

  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Task)
  };
  return Category;
};