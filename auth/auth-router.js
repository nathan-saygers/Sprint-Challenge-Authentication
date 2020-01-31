const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { jwtSecret } = require("../config/secrets.js");

const AuthHelpers = require("./auth-model.js");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  AuthHelpers.addUser(user)
    .then(saved => {
      console.log("AddUser authhelper firing in register post", saved);
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json({
        message: "The server encountered an error registering your user"
      });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  AuthHelpers.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);

        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "The server encountered an error registering your user"
      });
    });
});

function signToken(user) {
  const payload = {
    user: user
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
