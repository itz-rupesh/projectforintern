
const express = require('express');
const router = express.Router();
// const User = require('../models/user')
const User = require('../models/user');;
require('../conn');  // importing connection objects
const orgAuthenticate = require('../middleware/orgAuthenticate'); // middleware for JWT authentication

//    @route '/org/feed/userprofile'
//    @desc   APIs for user profile for org 

router.get('/basic/:user_id', orgAuthenticate, async (req, res) => {
    try {
        const users = await User.findOne({ _id: req.params.user_id }, { _id: 0, name: 1, email: 1, skills: 1, profession: 1, yoe: 1, socialLinks: 1, current_rating: 1 });
        return res.status(200).send(users);
    } catch (err) {
        return res.status(400).send({ message: 'something went wrong' });
    }
});

router.get('/education/:user_id', orgAuthenticate, async (req, res) => {
    try {
        const users = await User.findOne({ _id: req.params.user_id }, { _id: 0, education: 1 });
        return res.status(200).send(users);
    } catch (err) {
        return res.status(400).send({ message: 'something went wrong' });
    }
})

router.get('/projects/:user_id', orgAuthenticate, async (req, res) => {
    try {
        const users = await User.findOne({ _id: req.params.user_id }, { _id: 0, projects: 1 });
        return res.status(200).json(users);
    } catch (err) {
        return res.status(400).send({ message: 'something went wrong' });
    }
})
router.get('/achievements/:user_id', orgAuthenticate, async (req, res) => {
    try {
        const users = await User.findOne({ _id: req.params.user_id }, { _id: 0, achievements: 1 });
        return res.status(200).send(users);
    } catch (err) {
        return res.status(400).send({ message: 'something went wrong' });
    }
})
router.get('/rating/:user_id', orgAuthenticate, async (req, res) => {
    try {
        const users = await User.findOne({ _id: req.params.user_id }, { _id: 0, rating: 1 });
        return res.status(200).send(users);
    } catch (err) {
        return res.status(400).send({ message: 'something went wrong' });
    }
})
router.get('/skills/:user_id', orgAuthenticate, async (req, res) => {
    try {
        const users = await User.findOne({ _id: req.params.user_id }, { _id: 0, skills: 1 });
        return res.status(200).send(users);
    } catch (err) {
        return res.status(400).send({ message: 'something went wrong' });
    }
})

// @route  "/org/feed/userprofile/addrating"
// desc    to add organization rating by user
router.post('/addrating/:user_id', orgAuthenticate, async (req, res) => {
    try {
        const { performance, role, technologies, start_date, end_date, feedback,
            star, certificate } = req.body.newRating;
        const userid = req.userIdValue;
        const rating = {
            org_name: req.rootUser.name,
            organization: userid,
            performance: performance,
            role: role,
            technologies: technologies,
            start_date: start_date,
            end_date: end_date,
            feedback: feedback,
            star: star,
            certificate: certificate
        }
        // console.log(rating);
        const newRating = await User.findOneAndUpdate({ _id: req.params.user_id }, {
            $push: {
                "rating": rating
            }
        }, {
            new: true,
            useFindAndModify: true
        });
        // console.log(newRating);
        const ratingObj = newRating.rating[newRating.rating.length - 1];

        const updatedCurrentRating = await User.findOneAndUpdate({ _id: req.params.user_id },
            [{ $set: { current_rating: { $avg: '$rating.star' } } }], {
            new: true,
            useFindAndModify: true
        });
        return res.status(200).send({ message: "Rating added successfully!", newRating: ratingObj });

    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'something went wrong' });
    }
});


module.exports = router;