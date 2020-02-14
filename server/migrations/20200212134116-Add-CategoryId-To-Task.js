'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('Tasks', "CategoryId", { type: Sequelize.INTEGER });
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.removeColumn('Tasks', "CategoryId", { type: Sequelize.INTEGER });

  }
};
