const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "expense_tracker_full-stack",
  "root",
  "Hare@krishna123#",
  {
    dialect: "mysql",
    host: "localhost",
  }
);
