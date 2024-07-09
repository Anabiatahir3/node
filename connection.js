import mysql from "mysql2";
import Sequelize from "sequelize";

const sequelize = new Sequelize("node", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
