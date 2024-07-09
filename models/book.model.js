import Sequelize from "sequelize";
import sequelize from "../connection.js";
import Author from "./author.model.js";
import Library from "./library.model.js";
import { Member } from "./member.model.js";

const Book = sequelize.define("book", {
  isbn: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  coverImagePath: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  authorId: {
    type: Sequelize.INTEGER,
    references: {
      model: Author,
      key: "id",
    },
  },
  libraryName: {
    type: Sequelize.STRING,
    references: {
      model: Library,
      key: "name",
    },
  },
  issuedMember: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: {
      model: Member,
      key: "id",
    },
  },
});

Book.belongsTo(Author, {
  foreignKey: "authorId",
});
Author.hasMany(Book, {
  foreignKey: "authorId",
});

Book.belongsTo(Library, {
  foreignKey: "libraryName",
});
Library.hasMany(Book, {
  foreignKey: "libraryName",
});
Book.belongsTo(Member, { foreignKey: "issuedMember" });
Member.hasMany(Book, {
  foreignKey: "issuedMember",
});
export default Book;
