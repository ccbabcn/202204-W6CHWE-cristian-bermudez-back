require("dotenv").config();

const debug = require("debug")("robots:root");
const chalk = require("chalk");
const connectDataBase = require("./database/index");
const initializeSEerver = require("./server/initializeServer");

(async () => {
  try {
    await connectDataBase(process.env.MONGO_STRING);
    await initializeSEerver(process.env.SERVER_PORT || 4005);
  } catch {
    debug(chalk.red("Error initializing server"));
  }
})();
