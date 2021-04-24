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

    function createLikeQuery(key) {
        return "%" + key + "%";
    }

    if (Object.keys(searchQuery).length > 1) {
        // statuses need to be changed not great like that
        let queryString = SQL`SELECT * FROM pets WHERE `;
        if (searchQuery.adoptedStatus === "true") queryString.append(SQL`(adoption_status='ADOPTED'`);

        if (searchQuery.fosteredStatus === "true") {
            if (searchQuery.adoptedStatus === "false") queryString.append(SQL`(adoption_status='FOSTERED'`);
            else queryString.append(SQL` OR adoption_status='FOSTERED'`);
        }

        if (searchQuery.availableStatus === "true") {
            if (searchQuery.adoptedStatus === "false" && searchQuery.fosteredStatus === "false")
                queryString.append(SQL`(adoption_status='AVAILABLE'`);
            else queryString.append(SQL` OR adoption_status='AVAILABLE'`);
        }

        if (searchQuery.adoptedStatus === "true" || searchQuery.fosteredStatus === "true" || searchQuery.availableStatus === "true"){
            queryString.append(SQL`)`);
        }

        if (searchQuery.height !== "0"){
            if (queryString.text.slice(-5) === "WHERE") queryString.append(SQL`height=${searchQuery.height}`);
            else queryString.append(SQL` AND height=${searchQuery.height}`);
        }

        if (searchQuery.weight !== "0"){
            if (queryString.text.slice(-5) === "WHERE") queryString.append(SQL`weight=${searchQuery.weight}`);
            else queryString.append(SQL` AND weight=${searchQuery.weight}`);
        }

        if (searchQuery.petName !== "") {
            if (queryString.text.slice(-5) === "WHERE") 
                queryString.append(SQL`name LIKE ${createLikeQuery(searchQuery.petName)}`);
            else queryString.append(SQL` AND name LIKE ${createLikeQuery(searchQuery.petName)}`);
        }

        if (searchQuery.animalType !== "") {
            if (queryString.text.slice(-5) === "WHERE") 
                queryString.append(SQL`type LIKE ${createLikeQuery(searchQuery.animalType)}`);
            else queryString.append(SQL` AND type LIKE ${createLikeQuery(searchQuery.animalType)}`);
        }

        if (queryString.text.slice(-5) === "WHERE") {
            const rows = await query(SQL`SELECT * FROM pets`);
            return rows;
        }

        const rows = await query(queryString);
        return rows;
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

async function getPetWithUserId(pet_id, user_id){
    const rows = await query(SQL`SELECT * FROM user_pets WHERE pet_id=${pet_id} AND user_id=${user_id}`);
    return rows[0];
}
exports.getPetWithUserId = getPetWithUserId;

async function savePet(pet_id, user_id, inTable) {
    if (inTable) await query(SQL`UPDATE user_pets SET saved=TRUE WHERE pet_id=${pet_id} AND user_id=${user_id}`);
    else await query(SQL`INSERT INTO user_pets (user_id, pet_id, saved) VALUES (${user_id}, ${pet_id}, TRUE)`);
}
exports.savePet = savePet;

async function deleteSavedPet(pet_id, user_id) {
    await query(SQL`UPDATE user_pets SET saved=FALSE WHERE user_id=${user_id} AND pet_id=${pet_id}`);
}
exports.deleteSavedPet = deleteSavedPet;

async function adoptPet(pet_id, user_id, statusType, inTable) {
    if (inTable) await query(SQL`UPDATE user_pets SET owned=TRUE WHERE user_id=${user_id} AND pet_id=${pet_id}`);
    else await query(SQL`INSERT INTO user_pets (user_id, pet_id, owned) VALUES (${user_id}, ${pet_id}, TRUE)`);
    
    if (statusType === "adopt") await query(SQL`UPDATE pets SET adoption_status='ADOPTED' WHERE pet_id=${pet_id}`);
    else await query(SQL`UPDATE pets SET adoption_status='FOSTERED' WHERE pet_id=${pet_id}`);
}
exports.adoptPet = adoptPet;

async function returnPet(pet_id, user_id) {
    await query(SQL`UPDATE user_pets SET owned=FALSE WHERE pet_id=${pet_id} AND user_id=${user_id}`);
    await query(SQL`UPDATE pets SET adoption_status='AVAILABLE' WHERE pet_id=${pet_id}`);
}
exports.returnPet = returnPet;
