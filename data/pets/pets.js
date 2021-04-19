const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); 

const petsPath = path.resolve(`${__dirname}`, "mock_pets.json");

async function readPets() {
    return new Promise((resolve, reject) => {
        fs.readFile(petsPath, (err, data) => {
            if (err) reject(err);
            else resolve(JSON.parse(data.toString()));
        });
    });
}
exports.readPets = readPets;

function writePets(pets) {
    return new Promise((resolve, reject) => {
        fs.writeFile(petsPath, JSON.stringify(pets), (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}
exports.writePets = writePets;

async function addNewPet(pet) {
    const pets = await readPets();
    console.log(pet);
    const newPet = {
        id: uuidv4(),
        ...pet,
    };
    pets.push(newPet);
    await writePets(pets);
}
exports.addNewPet = addNewPet;
