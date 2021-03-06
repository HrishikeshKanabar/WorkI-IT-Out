const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFormat");

const workoutSchema = new Schema(
  {
    workoutText: {
      type: String,
      required: "Share your Workout!",
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

workoutSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Workout = model("Workout", workoutSchema);

module.exports = Workout;
