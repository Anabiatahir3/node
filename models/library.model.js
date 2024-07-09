import sequelize from "../connection.js";
import Sequelize from "sequelize";

const Library = sequelize.define("library", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true, //if primary key column is not given it will be set on its own with default id
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Library;
