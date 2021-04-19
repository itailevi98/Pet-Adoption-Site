const express = require('express');
const { AddPetSchema } = require("../data/pets/addPetSchema");
const postPetValidationSchema = require("../middlewares/petValidation");
const { addNewPet, readPets } = require("../data/pets/pets");

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const pets = await readPets();
        res.status(201).send({ pets: pets });
    } catch (err) {
        next(err);
    }
});

router.post('/',
    postPetValidationSchema(AddPetSchema),
    (req, res, next) => {
    try {
        const newPet = req.body;
        addNewPet(newPet);
        res.status(201).send({ pet: newPet});
    } catch (err) {
        res.status(400);
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const pets = await readPets();
        const id = req.params.id;
        for(const pet of pets) {
            if (pet.id === id) {
                res.status(201).send({ pet: pet });
                return;
            }
        }
        res.status(400).send({text: "Pet does not exist in db"});
    } catch (err) {
        res.status(400);
        next(err);
    }
});

module.exports = router;
