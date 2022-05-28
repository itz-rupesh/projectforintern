const express = require('express');
const router = express.Router();
const Organization = require('../models/organization');
require('../conn');
const orgAuthenticate = require('../middleware/orgAuthenticate');


// @route  "/org/info/basic"
// desc    to get basic information about organization

router.get('/basic', orgAuthenticate, async (req, res) => {
    try {
        const organization = await Organization.findOne({ _id: req.userID }, { _id: 0, name: 1, email: 1, technologies: 1, about: 1, socialLinks: 1, documents: 1, current_rating: 1 });
        return res.status(200).send(organization);
    } catch (err) {
        return res.status(400).send({ error: 'something went wrong' });
    }
});

// @route  "/org/info/achievements"
// desc    to get achievements of organization

router.get('/achievements', orgAuthenticate, async (req, res) => {
    try {
        const organization = await Organization.findOne({ _id: req.userID }, { _id: 0, achievements: 1 });
        return res.status(200).send(organization);
    } catch (err) {
        return res.status(400).send({ error: 'something went wrong' });
    }
});
router.get('/rating', orgAuthenticate, async (req, res) => {
    try {
        const rating = await Organization.findOne({ _id: req.userID }, { _id: 0, rating: 1 });
        return res.status(200).send(rating);
    } catch (err) {
        return res.status(400).send({ error: 'something went wrong' });
    }
});

// @Route org/info/liveprojects

router.get('/liveprojects', orgAuthenticate, (req, res) => {

    // const posts = Organization.findOne({ '$and': [{ _id: req.userID }, { projects: { title: "a messanger app" } }] }, { _id: 0, projects: 1 }).populate('projects').exec((err, docs) => {
    const posts = Organization.findOne({ _id: req.userID }, { _id: 0, projects: 1 }).populate('projects').sort({ "projects.post_date": -1 }).exec((err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).send({ error: "Something went wrong!" });
        } else {
            return res.status(200).send(docs);
        }
    });

})

// @Route org/info/locations
router.get('/locations', orgAuthenticate, async (req, res) => {
    try {
        const locations = await Organization.findOne({ _id: req.userID }, { _id: 0, locations: 1 });
        return res.status(200).send(locations);
    } catch (err) {
        return res.status(400).send({ error: 'something went wrong' });
    }
});


module.exports = router;