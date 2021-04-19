const express = require('express');
const { getUserById } = require("../data/users/users");
const base64url = require("base64url");

const router = express.Router();

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const dec = JSON.parse(base64url.default.decode(id));
        const user = await getUserById(dec.id);
        if (!user) {
            res.status(404).send("Unable to find a user with that ID");
            return;
        }
        const { email, first_name, last_name, created_date } = user;
        res.status(200).send({ 
            user: {
                email,
                first_name,
                last_name,
                created_date
            }
        });
    } catch (err) {
        res.status(400);
        next(err);
    }
});

module.exports = router;
