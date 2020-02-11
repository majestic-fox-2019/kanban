'use strict';
module.exports = (sequelize, DataTypes) => {

  const {Model} = sequelize.Sequelize

  class Category extends Model {}

  Category.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title is empty"
        },
        notNull: {
          msg: "Title is empty"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {sequelize});
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Task)
    Category.belongsTo(models.User)
  };
  return Category;
};