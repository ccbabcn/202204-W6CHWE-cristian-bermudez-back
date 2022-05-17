const { Schema, model } = require("mongoose");

const RobotSchema = new Schema({
  name: { type: String },
  velocity: { type: Number, min: 0, max: 10 },
  resistance: { type: Number, min: 0, max: 10 },
  created: { type: String },
  image: { type: String },
});

const Robot = model("Robot", RobotSchema, "robots");

module.exports = Robot;
