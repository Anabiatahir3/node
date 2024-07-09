import express from "express";
import memberRouter from "./routes/member.js";
import sequelize from "./connection.js";
import bookRouter from "./routes/books.js";
import libraryRouter from "./routes/library.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json()); //middleware to parse request with json bodies, no need for json.parse
app.use("/users", memberRouter);
app.use("/books", bookRouter);
app.use("/library", libraryRouter);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established");

    return sequelize.sync({ force: true });
    // `force: true` will drop and recreate the tables on each server start,
    //By using alter: true, you maintain data consistency while applying schema changes.
  })
  .then(() => {
    console.log("Database synchronized");

    app.listen(9000, (err) => {
      if (err) {
        console.error("Error in server setup", err);
      } else {
        console.log("Server listening on Port", 9000);
      }
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

export default app;
