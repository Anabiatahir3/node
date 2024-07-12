import Sequelize from "sequelize";
import sequelize from "../connection.js";
import Library from "./library.model.js";

const Member = sequelize.define("Member", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: { type: Sequelize.STRING, allowNull: false },
  booksissued: { type: Sequelize.INTEGER, defaultValue: 0 },
  libraryName: {
    type: Sequelize.STRING,
    references: {
      model: Library,
      key: "name",
    },
  },
});
Member.belongsTo(Library, {
  foreignKey: "libraryName",
});
Library.hasMany(Member, { foreignKey: "libraryName" });
export default Member;
