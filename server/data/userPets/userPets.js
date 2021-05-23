const { query } = require("../../lib/db");
const SQL = require('@nearform/sql');

async function getPetsByUserId(user_id) {
    const rows = await query(SQL`SELECT * FROM user_pets WHERE user_id=${user_id}`);
    return rows;
}
exports.getPetsByUserId = getPetsByUserId;
