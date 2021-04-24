const express = require('express');
const { getUserById, updateUser } = require("../data/users/users");
const base64url = require("base64url");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get('/:id', auth, async (req, res, next) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            res.status(404).send("Unable to find a user with that ID");
            return;
        }
        const user = await getUserById(userId);
        res.status(200).send({ 
            user: user
        });
    } catch (err) {
        res.status(400);
        next(err);
    }
});

router.put('/:id', auth, async (req, res, next) => {
    try { 
        const id = req.user.id;
        const user = req.body;
        const { email, firstName, lastName, phoneNumber, bio } = user;
        let passwordBool;
        if ("password" in user) {
            passwordBool = true;
            bcrypt.hash(user.password, 10, async (err, hash) => {
                if (err) next(err);
                else {
                    const newUser = {
                        id, 
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
                id,
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
