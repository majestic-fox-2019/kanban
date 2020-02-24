require('dotenv').config()
module.exports = {
  "development": {
    "username": process.env.usernamePG,
    "password": process.env.passwordPG,
    "database": "kanban",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": process.env.productionUsername,
    "password": process.env.productionPassword,
    "database": process.env.productionDatabase,
    "host": process.env.productionHost,
    "dialect": "postgres"
  }
}
