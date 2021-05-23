const express = require('express');
const { getUserById, updateUser, getUsers, getFullUserById, updateUserRole } = require("../data/users/users");
const { auth } = require("../middlewares/auth");
const bcrypt = require('bcrypt');

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
        next(err);
    }
    
});

router.get('/', async (req, res, next) => {
    try {
        const users = await getUsers();
        res.status(200).send({ users: users });
    } catch (err) {
        next(err);
    }
});

router.get('/:id/full', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user, petsRows } = await getFullUserById(id);
        if (user) {
            if (petsRows.length === 0) res.status(200).send({ 
                user: user,
                userPets: null
            });
            else res.status(200).send({
                user: user,
                userPets: petsRows,
            });
        }
        else {
            res.status(404).send({ error: "User not found with that ID" });
            return;
        }
    } catch (err) {
        next(err);
    }
});

router.put("/:id/role", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { newRole } = req.body;
        await updateUserRole(id, newRole);
        res.status(201).send({ status: "User status updated." });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
