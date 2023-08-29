const User = require("../models/usersSchema");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST register user
// PATH : api/users/register
//access : public
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      res.status(400);
      throw new Error("All fields MUST be filled");
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("Email is already exist");
    }
    //hashing password
    const hashedPassword = await bycrypt.hash(password, 8);
    //end of hashing
    const createUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    if (createUser) {
      res.status(201).json({
        message: "User created successfuly",
        ID: createUser._id,
        Email: createUser.email,
      });
    } else {
      res.status(400);
      throw new Error("user data is not valid");
    }
  } catch (err) {
    res.status(400).json({ message: err.message, stack: err.stack });
  }
};

// POST login user
// PATH : api/users/login
//access : public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All fileds MUST be filled");
    }
    const user = await User.findOne({ email });
    if (user && (await bycrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          user: { id: user._id, username: user.username, email: user.email },
        },
        process.env.SECRET,
        { expiresIn: "20m" }
      );
      res
        .status(200)
        .json({ message: "logged in successfully !", token: token });
    } else {
      res.status(400);
      throw new Error("email or password is invalid");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET current user
// PATH : api/users/current
//access : private
const currentUser = (req, res) => {
  res.json(req.user);
};

module.exports = { registerUser, loginUser, currentUser, getUsers };
