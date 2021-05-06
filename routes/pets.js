const express = require('express');
const { AddPetSchema } = require('../data/pets/addPetSchema');
const { addNewPet, getPetsFromSearch, getPetById, getPetWithUserId, savePet, deleteSavedPet, adoptPet, returnPet, updatePet } = require('../data/pets/pets');
const postPetValidationSchema = require("../middlewares/petValidation");
const userPetsRouter = require("./userPets");
const { auth } = require("../middlewares/auth");
const { upload } = require('../middlewares/multipart');
const { uploadToCloudinary } = require('../lib/cloudinary');
const fs = require("fs");

const router = express.Router();

router.use("/user", userPetsRouter);

router.post("/",
    upload.single('petPicture'),
    (req, res, next) => {
        //change the types to the corresponding types
        req.body['hypoallergenic'] = true ? req.body.hypoallergenic === "true" : false;
        const height = parseFloat(req.body['height']);
        req.body['height'] = height;
        const weight = parseFloat(req.body['weight']);
        req.body['weight'] = weight;
        next();
    }, 
    postPetValidationSchema(AddPetSchema),
    async (req, res) => {
        const pet = req.body;
        if (pet.petPicture !== "null") {
            const result = await uploadToCloudinary(req.file.path);
            fs.unlinkSync(req.file.path);
            const fileUrl = result.secure_url;
            pet["picture"] = fileUrl;
        }
        else {
            delete pet.petPicture;
            pet.picture = "null";
        }
        const added = await addNewPet(pet);
        if (added) {
            res.status(201).send({ pet: pet });
            return;
        }
        res.status(400).send({ error: "Error creating pet. Make sure all the fields are correct" });
});

router.put("/:id", 
    upload.single('petPicture'),
    (req, res, next) => {
        //change the types to the corresponding types
        req.body['hypoallergenic'] = true ? req.body.hypoallergenic === "true" : false;
        const height = parseFloat(req.body['height']);
        req.body['height'] = height;
        const weight = parseFloat(req.body['weight']);
        req.body['weight'] = weight;
        next();
    }, 
    postPetValidationSchema(AddPetSchema),
    async (req, res, next) => {
        const { id } = req.params;
        const pet = req.body;
        if (pet.petPicture) {
            const url = pet.petPicture[1];
            delete pet.petPicture;
            pet["picture"] = url;
        }
        else {
            const result = await uploadToCloudinary(req.file.path);
            fs.unlinkSync(req.file.path);
            const fileUrl = result.secure_url;
            pet["picture"] = fileUrl;
        }
        try{
            await updatePet(pet, id);
            res.status(200).send({ message: "Pet updated" });
        } catch (err) {
            next(err);
        }
    }
);

router.get("/", async (req, res, next) => {
    try {  
        const query = req.query;
        const results = await getPetsFromSearch(query);
        res.status(200).send({ results: results });
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const pet = await getPetById(id);
        res.status(200).send({ pet: pet });
    } catch (err) {
        next(err);
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
        next(err);
    }
});

router.delete("/:id/save", auth, async (req, res, next) => {
    try {
        const petId = req.params.id;
        const userId = req.user.id;
        await deleteSavedPet(petId, userId);
        res.status(200).send({ message: "Pet unsaved" });
    } catch (err) {
        next(err);
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
        next(err);
    }
});

router.post("/:id/return", auth, async (req, res, next) => {
    try { 
        const petId = req.params.id;
        const userId = req.user.id;
        await returnPet(petId, userId);
        res.status(200).send({ message: `Pet removed and set to available` });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
