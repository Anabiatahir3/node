import sequelize from "../connection.js";
import Sequelize from "sequelize";
import Book from "./book.model.js";
import Member from "./member.model.js";
import Library from "./library.model.js";

const Transaction = sequelize.define("transaction", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bookId: {
    type: Sequelize.STRING,
    references: {
      model: Book,
      key: "isbn",
    },
  },
  memberId: {
    type: Sequelize.INTEGER,
    references: {
      model: Member,
      key: "id",
    },
  },
  libraryId: {
    type: Sequelize.STRING,
    references: {
      model: Library,
      key: "name",
    },
  },
  transactionType: {
    type: Sequelize.ENUM("issue", "deissue"),
    allowNull: false,
  },
  transactionDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});
Transaction.belongsTo(Book, {
  foreignKey: "bookId",
});
Book.hasMany(Transaction, {
  foreignKey: "bookId",
});

Transaction.belongsTo(Member, {
  foreignKey: "memberId",
});
Book.hasMany(Transaction, {
  foreignKey: "memberId",
});

Transaction.belongsTo(Library, {
  foreignKey: "libraryId",
});
Library.hasMany(Transaction, {
  foreignKey: "libraryId",
});

Transaction.addScope("latestForBook", (bookId) => ({
  where: { bookId },
  order: [["transactionDate", "DESC"]],
  limit: 1,
  include: [Member],
}));
export default Transaction;
