const express = require("express");
const router = express.Router();
const db = require("../models/db");
const bcrypt = require("bcryptjs");

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  // check unique email
  const [[exists]] = await db.query(
    "SELECT id FROM users WHERE email=?",
    [email]
  );
  if (exists)
    return res.status(400).json({ message: "Email already registered" });

  const hash = await bcrypt.hash(password, 10);

  const [result] = await db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)",
    [name, email, hash, role || "user"]
  );

  res.json({ id: result.insertId, name, email, role });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const [[user]] = await db.query(
    "SELECT * FROM users WHERE email=?",
    [email]
  );
  if (!user)
    return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(400).json({ message: "Invalid credentials" });

  delete user.password;
  res.json(user);
});

module.exports = router;
