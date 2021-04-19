const mysql = require('mysql2');
const path = require('path');
const Postgrator = require('postgrator');

const postgrator = new Postgrator({
  migrationDirectory: path.resolve(__dirname, '../migrations'),
  driver: 'mysql2',
  host: '127.0.0.1',
  port: 3306,
  database: 'pet_adoption_db',
  username: 'root',
  password: 'root',
  schemaTable: 'migrations',
});
exports.postgrator = postgrator;

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'pet_adoption_db',
});
exports.pool = pool;

function query(sql) {
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}
exports.query = query;