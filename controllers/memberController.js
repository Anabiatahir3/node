import Library from "../models/library.model.js";
import Member from "../models/member.model.js";
export const addMember = async (req, res) => {
  const { name, email, libraryName } = req.body;
  try {
    const library = await Library.findOne({ where: { name: libraryName } });
    if (!library) {
      throw new Error("Enter valid library to be a member of ");
    }
    const member = await Member.findOne({ where: { email: email } });
    if (member) {
      throw new Error("One person is liable for single membership");
    }
    const newMember = await Member.create({
      name,
      libraryName: library.name, //have to add this because of foreign key constraint
      email,
    });

    res.status(201).json(newMember);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

//controller to remove (delete member) or change membership
//if membership is removed, then the member is removed entirely and when changing the membership the member is udated only

export const changeMemberShip = async (req, res) => {
  const { status, newLibrary } = req.query;
  const { email } = req.body;
  try {
    if (status == "remove") {
      const member = await Member.destroy({ where: { email: email } });
      res.status(200).json({ member });
    } else {
      const library = await Library.findOne({ where: { name: newLibrary } });
      if (!library) {
        throw new Error("Library not registered");
      }
      const member = await Member.findOne({ where: { email: email } });
      await member.update({ libraryName: newLibrary });
      await member.save();
      res.status(201).json({ member, msg: "Updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
