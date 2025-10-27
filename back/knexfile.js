// Update with your config settings.
require("dotenv").config();

module.exports = {
  client: "mysql",
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.SERVER_HOST,
    port: process.env.DB_PORT,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: `${__dirname}/src/database/migrations`,
  },
};
