const express = require('express');
const router = express.Router();
const db = require('../models/db');

//Get Teams
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM teams");
  res.json(rows);
});

//Create Team
router.post("/", async (req, res) => {
  const { name } = req.body;
  const [result] = await db.query("INSERT INTO teams (name) VALUES (?)", [name]);
  res.json({ id: result.insertId });
});

module.exports = router;