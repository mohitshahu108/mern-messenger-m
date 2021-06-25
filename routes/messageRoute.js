const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Messages } = require("../models/messageModel");

router.get("/", async (req, res) => {
  const messages = await Messages.find({}).sort("-createdAt");
  res.send(messages);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send("error occured");
  let message = new Messages({
    message: req.body.message,
    email: req.body.email,
  });
  try {
    await message.save();
  } catch (error) {
    console.log(error);
  }
  res.send(message);
});

function validate(obj) {
  const schema = Joi.object({
    message: Joi.string().min(1).max(255).required(),
    email: Joi.string().email().required(),
  });
  return schema.validate(obj);
}

module.exports = router;
