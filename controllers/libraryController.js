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
//if a book is deleted then author is also deleted
//delete a library if library deleted books should not be deleted rather library name should be null against them
//edit an author
