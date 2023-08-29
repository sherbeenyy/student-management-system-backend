const express = require("express");
const validateToken = require("../middleware/validateToken");
const router = express.Router();
const {
  registerUser,
  loginUser,
  currentUser,
  getUsers,
} = require("../controllers/userController");

router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

module.exports = router;
