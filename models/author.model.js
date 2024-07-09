import Sequelize from "sequelize";
import sequelize from "../connection.js";
const Author = sequelize.define("author", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: { type: Sequelize.STRING, allowNull: true },
});

export default Author;
