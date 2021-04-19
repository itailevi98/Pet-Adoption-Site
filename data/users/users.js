const { query } = require('../../lib/db');
const SQL = require('@nearform/sql');

async function addNewUser(newUser) {
    const { email, hash, firstName, lastName, phoneNumber } = newUser;
    try{
        await query(SQL`INSERT INTO users 
        (email, password_hash, first_name, last_name, phone_number) 
        VALUES (${email}, ${hash}, ${firstName}, ${lastName}, ${phoneNumber})`);
        return true;
    } catch (err){
        return false;
    }
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

async function updateUser(user, passwordBool) {
    const { id, email, firstName, lastName, phoneNumber, bio } = user;
    if (passwordBool) {
        const { hash } = user;
        await query(SQL`UPDATE users SET email=${email}, password_hash=${hash}, first_name=${firstName}, last_name=${lastName}, phone_number=${phoneNumber}, bio=${bio} WHERE id=${id}`);
    }
    else {
        await query(SQL`UPDATE users SET email=${email}, first_name=${firstName}, last_name=${lastName}, phone_number=${phoneNumber}, bio=${bio} WHERE id=${id}`);
    }
}
exports.updateUser = updateUser;
