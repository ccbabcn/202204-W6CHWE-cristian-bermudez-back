const express = require("express");
const userLogin = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/", userLogin);

module.exports = userRouter;
