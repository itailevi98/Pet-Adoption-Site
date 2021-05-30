const express = require('express');
const { createComment, getComments } = require('../data/comments/comments');

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        const comment = req.body;
        await createComment(comment);
        res.status(201).send({ status: "Received comment" });
    } catch (err) {
        next(err);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const comments = await getComments();
        res.status(200).send({ comments: comments });
    } catch (err){
        next(err);
    }
});

module.exports = router;