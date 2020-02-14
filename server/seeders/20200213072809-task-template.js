'use strict'

const taskData = [
  {
    title: 'Bikin Navbar',
    category: 'backlog',
    UserId: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Bikin Footer',
    category: 'backlog',
    UserId: null,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', taskData, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', taskData, {})
  }
}
