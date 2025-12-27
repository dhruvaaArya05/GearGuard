const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root@mysql',
  database: 'gearguard',
});

module.exports = pool;