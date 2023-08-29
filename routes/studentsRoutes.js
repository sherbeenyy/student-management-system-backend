const express = require("express");
const router = express.Router();
const {
  getStudents,
  getStudent,
  postStudents,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentControllers");
const validateToken = require("../middleware/validateToken");

//protecting all the routes
router.use(validateToken);

router.get("/", getStudents);

router.get("/:id", getStudent);

router.post("/", postStudents);

router.put("/:id", updateStudent);

router.delete("/:id", deleteStudent);

module.exports = router;
