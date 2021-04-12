const express = require("express");
const cors = require("cors");
const { NewUserValidateSchema } = require("./data/users/userSignupSchema");
const getSignupValidationMiddleware = require("./middlewares/userValidation");
const { addNewUser } = require("./data/users/users"); 

const app = express();
app.use(cors());
app.use(express.json());
app.options('*', cors());


app.get("/", (req, res) => {
    res.status(200);
    res.send({text: "server is up and running"});
});

app.listen('5050', '0.0.0.0', () => {
    console.log('The server is listening on http://0.0.0.0:5050');
});

app.post('/signup', 
    getSignupValidationMiddleware(NewUserValidateSchema),
    async (req, res, next) => {
        console.log("in post");
        try { 
            const newUser = req.body;
            addNewUser(newUser);
            res.status(201).send({ user: newUser});
        } catch (err) {
            console.log("here");
            res.status(400);
            next(err);
        }
    }
);
