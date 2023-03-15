const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userid: { type: String, required: true, unique: true, minLength: 4 },
    password: { type: String, required: true, minLength: 4 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
