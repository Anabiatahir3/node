import Author from "../models/author.model.js";

export const postAuthor = async (req, res) => {
  const { name, email } = req.body;
  try {
    const newAuthor = await Author.create({
      name,
      email,
    });

    res.status(201).json(newAuthor);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
