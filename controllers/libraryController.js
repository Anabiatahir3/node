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
