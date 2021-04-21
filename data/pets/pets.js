const { query } = require("../../lib/db");
const SQL = require('@nearform/sql');

async function addNewPet(pet) {
    const { type, name, adoptionStatus, picture, height, weight, color, bio, hypoallergenic, dietaryRestrictions, breed } = pet;
    try {
        await query(SQL`INSERT INTO pets 
        (type, name, adoption_status, picture, height, weight, color, bio, hypoallergenic, dietary_restrictions, breed) 
        VALUES (${type}, ${name}, ${adoptionStatus}, ${picture}, ${height}, ${weight}, ${color}, ${bio}, ${hypoallergenic}, ${dietaryRestrictions}, ${breed})`);
        return true;
    } catch (err){
        return false;
    }
}
exports.addNewPet = addNewPet;

async function getPetsFromSearch(searchQuery) {
    if (Object.keys(searchQuery) > 1) {
        //advanced search
    }
    else {
        if (searchQuery.basicSearchQuery === "") {
            const rows = await query(SQL`SELECT * FROM pets`);
            return rows;
        }
        const type = "%" + searchQuery.basicSearchQuery + "%";
        const rows = await query(SQL`SELECT * FROM pets WHERE type LIKE ${type}`);
        return rows;
    }
}
exports.getPetsFromSearch = getPetsFromSearch;

async function getPetById(id) {
    const rows = await query(SQL`SELECT * FROM pets WHERE pet_id=${id}`);
    return rows[0];
}
exports.getPetById = getPetById;
