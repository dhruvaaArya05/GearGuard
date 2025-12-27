const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Get all requests
// router.get("/", async (req, res) => {
//   const [rows] = await db.query("SELECT * FROM requests");
//   res.json(rows);
// });

router.get("/", async (req, res) => {
  const [rows] = await db.query(`
    SELECT r.*, u.name AS assigned_name
    FROM requests r
    LEFT JOIN users u ON r.assigned_to = u.id
  `);
  res.json(rows);
});


// Get by equipment
router.get("/equipment/:id", async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM requests WHERE equipment_id=?",
    [req.params.id]
  );
  res.json(rows);
});

// Create request with auto-fill logic
// router.post("/", async (req, res) => {
//   const { subject, type, equipment_id, scheduled_date } = req.body;

//   // Auto fetch equipment team + technician
//   const [[equipment]] = await db.query(
//     "SELECT team_id, default_technician_id FROM equipment WHERE id=?",
//     [equipment_id]
//   );

//   const [result] = await db.query(
//     `INSERT INTO requests
//      (subject, type, equipment_id, team_id, assigned_to, scheduled_date, status, created_at)
//      VALUES (?,?,?,?,?,?, 'New', NOW())`,
//     [
//       subject,
//       type,
//       equipment_id,
//       equipment.team_id,
//       equipment.default_technician_id,
//       scheduled_date || null
//     ]
//   );

//   res.json({ id: result.insertId });
// });

router.post("/", async (req, res) => {
  const { subject, status, equipment_id } = req.body;

  const [result] = await db.query(
    `INSERT INTO requests (subject, status, equipment_id, assigned_to)
     VALUES (?, ?, ?, NULL)`,
    [subject, status || "New", equipment_id || null]
  );

  res.json({
    id: result.insertId,
    subject,
    status: status || "New",
    assigned_to: null
  });
});


// Update request (status, assign, duration)
// router.put("/:id", async (req, res) => {
//   const { status, assigned_to, duration_hours } = req.body;

//   await db.query(
//     `UPDATE requests SET status=?, assigned_to=?, duration_hours=? WHERE id=?`,
//     [status, assigned_to, duration_hours, req.params.id]
//   );

//   // Scrap logic
//   if (status === "Scrap") {
//     await db.query(
//       `UPDATE equipment SET is_scrapped=true
//        WHERE id = (SELECT equipment_id FROM requests WHERE id=?)`,
//       [req.params.id]
//     );
//   }

//   res.json({ message: "Updated" });
// });

router.put("/:id", async (req, res) => {
  const { status, assigned_to, duration_hours } = req.body;

  // get current values
  const [[current]] = await db.query(
    "SELECT assigned_to, duration_hours FROM requests WHERE id=?",
    [req.params.id]
  );

  await db.query(
    `UPDATE requests 
     SET status=?, assigned_to=?, duration_hours=? 
     WHERE id=?`,
    [
      status,
      assigned_to !== undefined ? assigned_to : current.assigned_to,
      duration_hours !== undefined ? duration_hours : current.duration_hours,
      req.params.id
    ]
  );

  // Scrap logic
  if (status === "Scrap") {
    await db.query(
      `UPDATE equipment SET is_scrapped=true
       WHERE id = (SELECT equipment_id FROM requests WHERE id=?)`,
      [req.params.id]
    );
  }

  res.json({ message: "Updated" });
});


module.exports = router;

