const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
require("dotenv").config();
const messages = require("./routes/messageRoute");
const users = require("./routes/userRouter");
const auth = require("./routes/auth");

mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log("database connected successfully"))
  .catch((err) => console.log(err));

/** ALL middle ware here */
app.use(express.json());

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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is up and running on ${port}`));
