const express = require('express');
const { getPetsByUserId } = require('../data/userPets/userPets');
const { auth } = require("../middlewares/auth");


const router = express.Router();

router.get("/:user_id", auth, async (req, res) => {
    const user_id = req.user.id;
    try {
        const pets = await getPetsByUserId(user_id);
        res.status(201).send({ pets: pets });
    } catch (err) {
        res.status(404).send("Error retrieving pets");
    }
});

module.exports = router;