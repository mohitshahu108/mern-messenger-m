const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
require("dotenv").config();
const messages = require("./routes/messageRoute");
const users = require("./routes/userRouter");
const auth = require("./routes/auth");

mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

/** ALL middle ware here */
app.use(express.json());
app.use(cors());

app.use("/api/messages", messages);
app.use("/api/users", users);
app.use("/api/auth", auth);

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 4000, () =>
  console.log(`Ready on http://localhost:4000`)
);
