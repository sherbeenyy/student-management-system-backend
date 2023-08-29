const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const studentsRoutes = require("./routes/studentsRoutes");
const userRoutes = require("./routes/usersRoutes");
//const errorHandler = require("./middleware/errorHandler");

const port = process.env.PORT;

// database connection
mongoose
  .connect(process.env.DATABASE_CONNECTION)
  .then(() => {
    app.listen(port, () => {
      console.log(`server is working on port ${port}`);
    });
    console.log("DataBase Connected...");
  })
  .catch((err) => {
    console.log(err);
  });
// end of connection

//app.use(errorHandler);
app.use(express.json());
//Routes
app.use("/api/students", studentsRoutes);
app.use("/api/users", userRoutes);
