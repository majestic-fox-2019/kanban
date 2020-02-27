require('dotenv').config()

module.exports = {
    "development": {
      "username": process.env.USERNAME_KEY,
      "password": process.env.PASSWORD_KEY,
      "database": process.env.DATABASE_KEY,
      "host": "127.0.0.1",
      "dialect": "postgres",
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql",
    },
    "production": {
      "username": process.env.PRODUCTION_USERNAME,
      "password": process.env.PRODUCTION_PASSWORD,
      "database": process.env.PRODUCTION_DATABASE,
      "host": process.env.PRODUCTION_HOST,
      "dialect": "postgres",
    }
}