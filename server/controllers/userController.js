const bcrypt = require("bcrypt");
const debug = require("debug")("robots:user-controllers");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/User");

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    debug(chalk.red("Received a wrong username"));
    const error = new Error("Username or password are wrong");

    error.code = 403;
    next(error);
  } else {
    const correctPassword = await bcrypt.compare(password, user.password);
    const userData = {
      username: user.username,
      // eslint-disable-next-line no-underscore-dangle
      id: user.id,
    };
    if (!correctPassword) {
      debug(chalk.red("Received a wrong password"));
      const error = new Error("Username or password are worng");

      error.code = 403;
      next(error);
    } else {
      const token = jwt.sign(userData, process.env.JWT_SECRET);
      debug(chalk.blueBright(`User ${userData.username} loged in`));

      res.status(201).json({ token });
    }
  }
};

module.exports = userLogin;
