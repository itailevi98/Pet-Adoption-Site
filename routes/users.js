const express = require('express');
const { getUserById, updateUser } = require("../data/users/users");
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
        const { email, first_name, last_name, phone_number, bio } = user;
        res.status(200).send({ 
            user: {
                email,
                first_name,
                last_name,
                phone_number, 
                bio,
            }
        });
    } catch (err) {
        res.status(400);
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try{
        const { id } = req.params;
        const dec = JSON.parse(base64url.default.decode(id));
        //dec.id is actual id
        const newId = dec.id;
        const user = req.body;
        const { email, firstName, lastName, phoneNumber, bio } = user;
        let passwordBool;
        if ("password" in user) {
            passwordBool = true;
            bcrypt.hash(user.password, 10, async (err, hash) => {
                if (err) next(err);
                else {
                    const newUser = {
                        id: newId, 
                        email, 
                        hash, 
                        firstName, 
                        lastName, 
                        phoneNumber,
                        bio
                    };
                    await updateUser(newUser, true);
                    res.status(201).send({ user: { email, firstName, lastName, phoneNumber, bio } });
                    return;
                }
            });
        }
        else {
            const newUser = {
                id: newId,
                email,
                firstName,
                lastName,
                phoneNumber,
                bio
            };
            await updateUser(newUser, false);
            res.status(201).send({ user: { email, firstName, lastName, phoneNumber, bio } });
        }
       
    } catch (err) {
        //provide error status and message
        next(err);
    }
    
});

module.exports = router;
