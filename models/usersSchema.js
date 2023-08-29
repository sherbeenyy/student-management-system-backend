const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    username: { type: String, required: [true, "add the user name "] },
    email: { type: String, required: [true, "add the user email "] },
    password: { type: String, required: [true, "add the user password "] },
    role: { type: String, required: [true, "add the user role "] },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", usersSchema);

module.exports = User;
