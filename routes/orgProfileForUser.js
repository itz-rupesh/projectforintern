
const express = require('express');
const router = express.Router();
// const User = require('../models/user');
require('../conn');  // importing connection objects
const authenticate = require('../middleware/authenticate'); // middleware for JWT authentication
const Organization = require('../models/organization');
require('../conn');


//  this router used to get all the ORG profile info for user/stundet
// redirected from userFeed



// @route  "/account/feed/orgprofile/basic"
// desc    to get basic information about organization

router.get('/basic/:org_id', authenticate, async (req, res) => {
    console.log(req.params.org_id);
    try {
        const organization = await Organization.findOne({ _id: req.params.org_id }, { _id: 0, name: 1, email: 1, technologies: 1, about: 1, socialLinks: 1, documents: 1, current_rating: 1 });
        return res.status(200).send(organization);
    } catch (err) {
        return res.status(400).send({ error: 'something went wrong' });
    }
});

// @route  "/account/feed/orgprofile/achievements"
// desc    to get achievements of organization

router.get('/achievements/:org_id', authenticate, async (req, res) => {
    try {
        const organization = await Organization.findOne({ _id: req.params.org_id }, { _id: 0, achievements: 1 });
        return res.status(200).send(organization);
    } catch (err) {
        return res.status(400).send({ error: 'something went wrong' });
    }
});

// @route  "/account/feed/orgprofile/addrating"
// desc    to add organization rating by user
router.post('/addrating/:org_id', authenticate, async (req, res) => {
    try {
        // const chackForUserRating = await 
        const userid = req.userIdValue;
        const rating = {
            user: userid,
            user_name: req.rootUser.name,
            feedback: req.body.feedback,
            experience: req.body.experience,
            star: req.body.star
        }

        const newRating = await Organization.findOneAndUpdate({ _id: req.params.org_id }, {
            $push: {
                "rating": rating
            }
        }, {
            new: true,
            useFindAndModify: true
        });
        console.log(newRating);
        // const updated_current_rating = newRating.current_stars / newRating.rating.length;
        // const setStars = await Organization.findByIdAndUpdate({ _id: req.params.org_id }, { $set: { current_rating: updated_current_rating } })
        const ratingObj = newRating.rating[newRating.rating.length - 1];

        // console.log(newRating);
        // console.log(newRating.current_rating);
        // const organization = await Organization.findOne({ _id: req.params.org_id }, { _id: 0, rating: 1 });

        const updatedCurrentRating = await Organization.findOneAndUpdate({ _id: req.params.org_id },
            [{ $set: { current_rating: { $avg: '$rating.star' } } }], {
            new: true,
            useFindAndModify: true
        });
        // console.log(updatedCurrentRating.current_rating);



        // cursor = Organization.aggregate([
        //     { $unwind: "$rating" },
        //     { $group: { _id: req.params.org_id, current_rating: { $avg: "$rating.star" } } }
        // ]);
        // console.log(cursor);

        return res.status(200).send({ message: "Rating added successfully!", newRating: ratingObj });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'something went wrong' });
    }
});

// @route  "/account/feed/orgprofile/rating"
// desc    to get achievements of organization
router.get('/rating/:org_id', authenticate, async (req, res) => {
    try {
        const rating = await Organization.findOne({ _id: req.params.org_id }, { _id: 0, rating: 1 });
        return res.status(200).send(rating);
    } catch (err) {
        return res.status(400).send({ error: 'something went wrong' });
    }
});


// @route  "/account/feed/orgprofile/livepojects"
// desc    to get live projects of organization
router.get('/liveprojects/:org_id', authenticate, (req, res) => {
    // const posts = Organization.findOne({ '$and': [{ _id: req.userID }, { projects: { title: "a messanger app" } }] }, { _id: 0, projects: 1 }).populate('projects').exec((err, docs) => {
    const posts = Organization.findOne({ _id: req.params.org_id }, { _id: 0, projects: 1 }).populate('projects').sort({ "projects.post_date": -1 }).exec((err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).send({ error: "Something went wrong!" });
        } else {
            return res.status(200).send(docs);
        }
    });

})

// @route  "/account/feed/orgprofile/locations"
// desc    to get locations of organization
router.get('/locations/:org_id', authenticate, async (req, res) => {
    try {
        const locations = await Organization.findOne({ _id: req.params.org_id }, { _id: 0, locations: 1 });
        return res.status(200).send(locations);
    } catch (err) {
        return res.status(400).send({ error: 'something went wrong' });
    }
});


module.exports = router;
