
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Organization = require('../models/organization');
require('../conn');
// const authenticate = require('../middleware/authenticate'); // middleware for JWT authentication


// @route  '/search/org/:keyword'
// @desc    search for organization details: name, email , _id

router.get('/org/:keyword', (req, res) => {
    // console.log("serch called");
    let regex = new RegExp(req.params.keyword, 'i');
    Organization.find({ $and: [{ name: regex }, { email: regex }] }, { _id: 1, name: 1, email: 1 }).then((ress) => {
        res.status(200).send(ress);
    }).catch((err) => {
        res.status(400).send({ message: "something went wrong!" });
    });
})

// @route  '/search/org/:keyword'
// @desc    search for organization details: name, email , _id

router.get('/user/:keyword', async (req, res) => {

    // console.log("serch called");
    let regex = new RegExp(req.params.keyword, 'i');
    User.find({ $and: [{ name: regex }, { email: regex }] }, { _id: 1, name: 1, email: 1 }).then((ress) => {
        res.status(200).send(ress);
    }).catch((err) => {
        res.status(400).send({ message: "something went wrong!" });
    });

})


module.exports = router;