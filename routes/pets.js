const express = require('express');
const { AddPetSchema } = require('../data/pets/addPetSchema');
const { addNewPet, getPetsFromSearch, getPetById } = require('../data/pets/pets');
const postPetValidationSchema = require("../middlewares/petValidation");

const router = express.Router();

router.post("/", 
    postPetValidationSchema(AddPetSchema), 
    async (req, res) => {
        const pet = req.body;
        const added = await addNewPet(pet);
        if (added) {
            res.status(201).send({ pet: pet });
            return;
        }
        res.status(400).send({ error: "Error creating pet. Make sure all the fields are correct" });
});

router.get("/", async (req, res, next) => {
    try {  
        const query = req.query;
        if ("basicSearchQuery" in query) {
            const results = await getPetsFromSearch(query);
            res.status(200).send({ results: results });
        }
    } catch (err) {
        res.status(400).send({ error: err });
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const pet = await getPetById(id);
        res.status(200).send({ pet: pet });
    } catch (err) {
        res.status(400).send({ error: err });
    }
})

module.exports = router;
