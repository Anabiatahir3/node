import Book from "../models/book.model.js";
import Author from "../models/author.model.js";
import { Op } from "sequelize";
import Library from "../models/library.model.js";

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
