import Book from "../models/book.model.js";
import Author from "../models/author.model.js";
import { Op } from "sequelize";
import Library from "../models/library.model.js";
import Member from "../models/member.model.js";

export const postBook = async (req, res) => {
  const { isbn, name, authorName, libraryName } = req.body;
  const coverImagePath = req.file ? req.file.path : null;

  const [author, created] = await Author.findOrCreate({
    where: { name: authorName },
  });

  try {
    const library = await Library.findOne({
      where: { name: libraryName },
    });
    if (!library) {
      throw new Error("No library found");
    }
    const newBook = await Book.create({
      isbn,
      name,
      authorId: author.id,
      libraryName: library.libraryName,
      coverImagePath,
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error inserting data:", error.message);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(201).json(books);
  } catch (error) {
    console.error("Error");
    res.status(500).json({ error: "Internal server" });
  }
};

export const searchBooks = async (req, res) => {
  const { name } = req.query;
  try {
    const books = await Book.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${name}%` } },
          { author: { [Op.like]: `%${name}%` } },
        ],
      },
    });
    if (books.length > 0) {
      res.status(200).json(books);
    } else {
      res.status(404).json({ error: "No books found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAuthorBook = async (req, res) => {
  const { name } = req.query;
  try {
    const bookAuthor = await Author.findOne({ where: { name: name } });
    console.log("authorinfo", bookAuthor);
    if (bookAuthor) {
      const books = await Book.findAll({
        where: { authorId: bookAuthor.id },
      });
      if (books.length > 0) {
        return res.status(200).json({ books });
      }
      throw new Error("No books found of this author");
    } else {
      throw new Error("No author of this name found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
//since isbn is unique for any individual book, we can search it using isbn for copies of the same book

export const changeBookIssuance = async (req, res) => {
  const { memberId, isbn } = req.params;
  const { action } = req.query;

  try {
    const book = await Book.findOne({
      where: { isbn: isbn },
      include: [Member],
    });

    if (!book) {
      return res.status(404).json({ error: "No book found with this ISBN" });
    }

    if (action === "issue") {
      if (book.issuedMember == null) {
        await book.update({ issuedMember: memberId });

        const updatedBook = await Book.findOne({
          where: { isbn: isbn },
          include: [Member],
        });

        return res.status(200).json({ book: updatedBook });
      } else {
        return res.status(400).json({ error: "Book is already issued" });
      }
    } else if (action === "deissue") {
      if (book.issuedMember == memberId) {
        await book.update({ issuedMember: null });

        const updatedBook = await Book.findOne({
          where: { isbn: isbn },
          include: [Member],
        });

        return res.status(200).json({ book: updatedBook });
      } else {
        return res
          .status(400)
          .json({ error: "Book is not issued to this member" });
      }
    } else {
      return res
        .status(400)
        .json({ error: "Invalid action. Use 'issue' or 'deissue'." });
    }
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};
