import express from "express";
import memberRouter from "./routes/member.js";
import sequelize from "./connection.js";
import bookRouter from "./routes/books.js";
import libraryRouter from "./routes/library.js";
import authorRouter from "./routes/author.js";
import os from "os";
import cluster from "cluster";

const app = express();
const totalCPUs = os.cpus().length;

app.use(express.json()); // Middleware to parse request with JSON bodies

app.use("/books", bookRouter);
app.use("/library", libraryRouter);
app.use("/member", memberRouter);
app.use("/author", authorRouter);

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection
  // In this case, it is an HTTP server
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection established");

      return sequelize.sync({ alter: true });
      // `force: true` will drop and recreate the tables on each server start,
      // By using alter: true, you maintain data consistency while applying schema changes.
    })
    .then(() => {
      console.log("Database synchronized");

      app.listen(9000, (err) => {
        if (err) {
          console.error("Error in server setup", err);
        } else {
          console.log(`Worker ${process.pid} started`);
        }
      });
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
}

export default app;
