const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already exist");
  }
  const salt = await bcrypt.genSalt(10);

  user = new User({
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt),
  });
  await user.save();
  res.send(user);
});

function validate(obj) {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(30),
    password: Joi.string().min(5).max(30),
  });
  return schema.validate(obj);
}

module.exports = router;
