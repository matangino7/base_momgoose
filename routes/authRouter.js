const express = require("express");
const authRouter = express.Router();
const { registerNewUser, loginUser } = require("../auth/authBl");

authRouter.post("/register", async (req, res) => {
  const newUser = req.body;
  const response = await registerNewUser(newUser);
  if (response) {
    return res.send(response);
  }
  return res.status(400).send("Error Registering Client...");
});

authRouter.post("/login", async (req, res) => {
  const user = req.body;
  const response = await loginUser(user);
  if (response) {
    return res.send(response);
  }
  return res.status(400).send("Error Logging In Client...");
});

module.exports = {
  authRouter,
};
