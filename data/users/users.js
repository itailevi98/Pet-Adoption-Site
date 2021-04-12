const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); 

const usersPath = path.resolve(`${__dirname}`, "users.json");

async function readUsers() {
    return new Promise((resolve, reject) => {
        fs.readFile(usersPath, (err, data) => {
            if (err) reject(err);
            else resolve(JSON.parse(data.toString()));
        });
    });
}
exports.readUsers = readUsers;

async function writeUsers(users) {
    return new Promise((resolve, reject) => {
        fs.writeFile(usersPath, JSON.stringify(users), (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}
exports.writeUsers = writeUsers;

async function addNewUser(user) {
    const users = await readUsers();
    console.log(user);
    const newUser = {
        id: uuidv4(),
        ...user,
    };
    users.push(newUser);
    await writeUsers(users);
}
exports.addNewUser = addNewUser;