const { query } = require('../../lib/db');
const SQL = require('@nearform/sql');

function addNewUser(newUser) {
    const { email, hash, firstName, lastName, phoneNumber } = newUser;
    return query(SQL`INSERT INTO users 
    (email, password_hash, first_name, last_name, phone_number) 
    VALUES (${email}, ${hash}, ${firstName}, ${lastName}, ${phoneNumber})`);
}
exports.addNewUser = addNewUser;

async function getUserByEmail(email) {
    const rows = await query(SQL`SELECT * FROM users WHERE email=${email}`);
    return rows[0];
}
exports.getUserByEmail = getUserByEmail;

async function getUserById(id) {
    const rows = await query(SQL`SELECT * FROM users WHERE id=${id}`);
    return rows[0];
}
exports.getUserById = getUserById;
