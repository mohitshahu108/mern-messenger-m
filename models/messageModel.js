const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    email: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

const Messages = mongoose.model("Messages", messageSchema);
exports.Messages = Messages;
