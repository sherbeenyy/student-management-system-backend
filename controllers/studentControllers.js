const Student = require("../models/studentsSchema");

// GET all students
// PATH : /api/students
// access : private
const getStudents = async (req, res) => {
  try {
    const students = await Student.find({ user_id: req.user.id });
    if (students) {
      res.status(200).json(students);
    } else {
      throw new Error("no students found !");
    }
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};

// GET student
// PATH : /api/students/:id
// access : private
const getStudent = async (req, res) => {
  try {
    const getOneStudent = await Student.findById(req.params.id);
    if (getOneStudent) {
      res.status(200).json(getOneStudent);
    } else {
      throw new Error(" Student not found");
    }
  } catch (err) {
    res.status(404).json({ message: err.message, stack: err.stack });
  }
};

// POST student
// PATH : /api/students
// access : private
const postStudents = async (req, res) => {
  // how to throw two errors
  try {
    const { name, email, phone, parentPhone } = req.body;
    if (!name || !email || !phone || !parentPhone) {
      throw new Error("All the fields should be filled");
    }
    const addStudents = await Student.create({
      name,
      email,
      phone,
      parentPhone,
      user_id: req.user.id,
    });
    if (addStudents) {
      res
        .status(201)
        .json({ message: "student added successfully", student: addStudents });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT student
// PATH : /api/students/:id
// access : private
const updateStudent = async (req, res) => {
  try {
    const { name, email, phone, parentPhone } = req.body;
    if (!name || !email || !phone || !parentPhone) {
      throw new Error("All the fields should be filled");
    }

    const findStudent = await Student.findById(req.params.id);
    if (!findStudent) {
      res.status(404);
      throw new Error("Not found ");
    }

    if (findStudent.user_id.toString() !== req.user.id) {
      res.status(402);
      throw new Error("users can only edit their students");
    }
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedStudent) {
      res.status(200).json({
        message: "Student updated successfully",
        updatedStudent: updatedStudent,
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.meesage, stack: err.stack });
  }
};

// DELETE student
// PATH : /api/students/:id
// access : private
const deleteStudent = async (req, res) => {
  try {
    const findStudent = await Student.findById(req.params.id);
    if (!findStudent) {
      res.status(404);
      throw new Error("Not found ");
    }

    if (findStudent.user_id.toString() !== req.user.id) {
      res.status(402);
      throw new Error("users can only delete their students");
    }
    const deleteStudent = await Student.findByIdAndDelete(req.params.id);
    if (deleteStudent) {
      res.status(200).json({
        message: "student deleted successfully",
        deleteStudent: deleteStudent,
      });
    } else {
      throw new Error("student is not found !");
    }
  } catch (err) {
    res.status(400).json({ title: "Can't delete", message: err.message });
  }
};

module.exports = {
  getStudents,
  getStudent,
  postStudents,
  updateStudent,
  deleteStudent,
};
