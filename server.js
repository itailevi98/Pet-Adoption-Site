const express = require("express");
const cors = require("cors");
const { NewUserValidateSchema } = require("./data/users/userSignupSchema");
const { UserLoginValidateSchema } = require("./data/users/userLoginSchema");
const getUserValidationMiddleware = require("./middlewares/userValidation");
const { addNewUser, getUserByEmail } = require("./data/users/users"); 
const petsRouter = require("./routes/pets"); 
const userRouter = require("./routes/users");
const { postgrator } = require("./lib/db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/pet', petsRouter);
app.use('/user', userRouter);

const port = "5050";
const host = "0.0.0.0";

postgrator.migrate().then((result) => {
    console.log(`migrated db successfully:`, result);
    app.listen(port, host, () => {
      console.log(`server is listening at http://${host}:${port}`);
    });
}).catch(error => console.error(error));

app.get("/", (req, res) => {
    res.status(200);
    res.send({text: "server is up and running"});
});

app.post('/login', 
    getUserValidationMiddleware(UserLoginValidateSchema),
    async (req, res, next) => {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        if (!user) {
            res.status(404).send('User not found with this email');
            return;
        }
        bcrypt.compare(password, user.password_hash, (err, result) => {
            if (err) next(err);
            else {
                if (result) {
                    const token = jwt.sign({ id: user.id }, `gUkXp2s5v8y/A?D(G+KbPeShVmYq3t6w`);
                    res.send({
                        token, 
                        user: {
                            id: user.id,
                            email: user.email,
                            created_date: user.created_date,
                        }
                    });
                }
                else {
                    res.status(400).send('Incorrect password');
                }
            }
        });
    }
);

app.post('/signup', 
    getUserValidationMiddleware(NewUserValidateSchema),
    async (req, res, next) => {
        try { 
            const { email, password, firstName, lastName, phoneNumber } = req.body;
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) next(err);
                else {
                    const newUser = {
                        email, 
                        hash, 
                        firstName, 
                        lastName, 
                        phoneNumber
                    };
                    const response = await addNewUser(newUser);
                    if(!response) {
                        res.status(400).send({ error: "Error creating user. Make sure it's not a duplicate email"});
                        return;
                    }
                    res.status(201).send({ user: { email, firstName, lastName, phoneNumber } });
                }
            });
        } catch (err) {
            res.status(400).send({ error: err });
            return;
        }
    }
);
