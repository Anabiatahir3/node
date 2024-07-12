import Library from "../models/library.model.js";

export const createLibrary = async (req, res) => {
  const { name, address } = req.body;
  try {
    if (await Library.findOne({ where: { name: name } })) {
      throw new Error("Library of the same name found");
    }
    const newLibrary = await Library.create({
      name,
      address,
    });

    res.status(201).json(newLibrary);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

//get all books of a specific author
//member issues books
//member returns books
//get all books issued by a member
//edit an author
//for a particular book, get the last transaction that was done against its isbn to check whether a book is issue or available
//No member can issue more than 4 books
//no issuing of a book that you arent a member of
