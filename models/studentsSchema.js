const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: [true, "add the student name"] },
    email: { type: String, required: [true, "add the student email"] },
    phone: { type: String, required: [true, "add the student phone number"] },
    parentPhone: {
      type: String,
      required: [true, "add the student parent phone"],
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentsSchema);

module.exports = Student;
