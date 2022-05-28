
const express = require('express');
const router = express.Router();
const User = require('../models/user');
require('../conn');
const authenticate = require('../middleware/authenticate'); // middleware for JWT authentication


router.get('/basic', authenticate, async (req, res) => {
    try {
        const users = await User.findOne({ _id: req.userID }, { _id: 0, name: 1, email: 1, skills: 1, profession: 1, yoe: 1, socialLinks: 1, current_rating: 1, profile_image: 1 });
        return res.status(200).send(users);
    } catch (err) {
        return res.status(400).send({ message: 'something went wrong' });
    }
});

router.get('/education', authenticate, async (req, res) => {
    try {
        const users = await User.findOne({ _id: req.userID }, { _id: 0, education: 1 });
        return res.status(200).send(users);
    } catch (err) {
        return res.status(400).send({ message: 'something went wrong' });
    }
})

router.get('/projects', authenticate, async (req, res) => {
    try {
        const users = await User.findOne({ _id: req.userID }, { _id: 0, projects: 1 });
        return res.status(200).json(users);
    } catch (err) {
        return res.status(400).send({ message: 'something went wrong' });
    }
})
router.get('/achievements', authenticate, async (req, res) => {
    try {
        const users = await User.findOne({ _id: req.userID }, { _id: 0, achievements: 1 });
        return res.status(200).send(users);
    } catch (err) {
        return res.status(400).send({ message: 'something went wrong' });
    }
})
router.get('/rating', authenticate, async (req, res) => {
    try {
        const users = await User.findOne({ _id: req.userID }, { _id: 0, rating: 1 });
        return res.status(200).send(users);
    } catch (err) {
        return res.status(400).send({ message: 'something went wrong' });
    }
})
router.get('/skills', authenticate, async (req, res) => {
    try {
        const users = await User.findOne({ _id: req.userID }, { _id: 0, skills: 1 });
        return res.status(200).send(users);
    } catch (err) {
        return res.status(400).send({ message: 'something went wrong' });
    }
})
module.exports = router;