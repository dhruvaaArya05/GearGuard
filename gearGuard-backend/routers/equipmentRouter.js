const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Get all equipment
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM equipment");
  res.json(rows);
});

// Create equipment
router.post("/", async (req, res) => {
  const {
    name, serial_no, department, owner_name,
    purchase_date, warranty_upto, location,
    team_id, default_technician_id
  } = req.body;

  const [result] = await db.query(
    `INSERT INTO equipment
     (name, serial_no, department, owner_name, purchase_date, warranty_upto, location, team_id, default_technician_id)
     VALUES (?,?,?,?,?,?,?,?,?)`,
    [name, serial_no, department, owner_name, purchase_date, warranty_upto, location, team_id, default_technician_id]
  );

  res.json({ id: result.insertId });
});

// Get one
router.get("/:id", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM equipment WHERE id=?", [req.params.id]);
  res.json(rows[0]);
});

module.exports = router;
