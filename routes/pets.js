const express = require('express');
const { AddPetSchema } = require('../data/pets/addPetSchema');
const { addNewPet, getPetsFromSearch, getPetById, getPetWithUserId, savePet, deleteSavedPet, adoptPet, returnPet } = require('../data/pets/pets');
const postPetValidationSchema = require("../middlewares/petValidation");
const userPetsRouter = require("./userPets");
const { auth } = require("../middlewares/auth");
const { resetErrorsCount } = require('ajv/dist/compile/errors');

const router = express.Router();

router.use("/user", userPetsRouter);

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
        const results = await getPetsFromSearch(query);
        res.status(200).send({ results: results });
    } catch (err) {
        console.log(err);
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
});

router.post("/:id/save", auth, async (req, res, next) => {
    try {
        const petId = req.params.id;
        const userId = req.user.id;
        const userPet = await getPetWithUserId(petId, userId);
        await savePet(petId, userId, userPet !== undefined);
        res.status(200).send({ message: "Pet Saved" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err });
    }
});

router.delete("/:id/save", auth, async (req, res, next) => {
    try {
        const petId = req.params.id;
        const userId = req.user.id;
        await deleteSavedPet(petId, userId);
        res.status(200).send({ message: "Pet unsaved" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err });
    }
});

router.post("/:id/adopt", auth, async (req, res, next) => {
    try {
        const petId = req.params.id;
        const userId = req.user.id;
        const { statusType } = req.body;
        const userPet = await getPetWithUserId(petId, userId);
        await adoptPet(petId, userId, statusType, userPet !== undefined);
        res.status(200).send({ message: `Pet ${statusType}ed` });
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err });
    }
});

router.post("/:id/return", auth, async (req, res, next) => {
    try { 
        const petId = req.params.id;
        const userId = req.user.id;
        await returnPet(petId, userId);
        res.status(200).send({ message: `Pet removed and set to available` });
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err });
    }
});

module.exports = router;
