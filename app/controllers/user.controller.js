const User = require("../models/user.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  console.log(req);
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a User
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    information: req.body.information,
    contact: req.body.contact,
    id_district: req.body.id_district,
    id_subdistrict: req.body.id_subdistrict,
  });

  // Save Tutorial in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send("aaa");
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required fields.",
    });
  }
  User.login(username, password, (err, user) => {
    if (err) {
      console.error("Error during login:", err);
      return res.status(500).json({
        message: "An error occurred while attempting to log in.",
      });
    }
    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }
    res.json({
      message: "Login successful!",
      user,
    });
  });
};
