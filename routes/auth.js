const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("./utils");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  res.send({
    _id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user),
  });
});

function validate(obj) {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(30),
    password: Joi.string().min(5).max(30),
  });
  return schema.validate(obj);
}

module.exports = router;
