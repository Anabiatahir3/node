import Author from "../models/author.model.js";

export const postAuthor = async (req, res) => {
  const { name, email } = req.body;
  try {
    const existingEmail = await Author.findOne({ where: { email: email } });
    if (existingEmail) {
      throw new Error("Email already exists");
    }
    const newAuthor = await Author.create({
      name,
      email,
    });
    res.status(201).json(newAuthor);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

//no allowing of changing names
export const editAuthor = async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  try {
    const author = await Author.findOne({ where: { id: id } });
    if (author) {
      const existingEmail = await Author.findOne({ where: { email: email } });
      if (existingEmail) {
        throw new Error("Email already exists");
      }
      await author.update({ email: email });
      await author.save();

      return res.status(201).json({ author });
    } else {
      throw new Error("No author of this id found");
    }
  } catch (error) {
    console.error("Error editing data");
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
