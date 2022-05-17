const express = require("express");
const auth = require("../middlewares/auth");

const { getRobots, deleteRobot } = require("../controllers/robotsControllers");

const robotsRouter = express.Router();
robotsRouter.get("/", getRobots);
robotsRouter.delete("/delete/:idRobot", auth, deleteRobot);

module.exports = robotsRouter;
