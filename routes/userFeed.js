
const express = require('express');
const router = express.Router();
// const User = require('../models/user');
const ProjectPost = require('../models/projectsPost');

require('../conn');  // importing connection objects
const authenticate = require('../middleware/authenticate'); // middleware for JWT authentication
// const organization = require('../models/organization');

const orgProfileForUser = require('./orgProfileForUser');
const { default: mongoose } = require('mongoose');
router.use('/orgprofile', orgProfileForUser);


//    @route '/account/feed/liveprojects'
//            user feed for live projects 
router.get('/liveprojects', authenticate, async (req, res) => {
    // const myid = req.userID;
    try {
       
        ProjectPost.find({
            $and: [{ islive: true }, {
                right_swipe: {
                    $not: {
                        $elemMatch: { userID: req.userID }
                    }
                }
            }, {
                left_swipe: {
                    $not: {
                        $elemMatch: { userID: req.userID }
                    }
                }
            }, {
                matched: {
                    $not: {
                        $elemMatch: { userID: req.userID }
                    }
                }
            }, {
                unmatched: {
                    $not: {
                        $elemMatch: { userID: req.userID }
                    }
                }
            }]
        }).populate('organization_id').exec((err, project) => {
            if (err) {
                console.log(err);
                return res.status(400).send({ error: "something went wrong!" });
            } else {
                return res.status(200).send(project);
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'something went wrong!' });
    }
});

//    @route '/account/feed/liveprojects/rightswipe'
//            user feed right-swipe

router.post('/liveprojects/rightswipe', authenticate, (req, res) => {
    const userIdValue = req.userIdValue;
    // console.log(userIdValue);
    // console.log(req.body.project_id)
    ProjectPost.findOneAndUpdate({ _id: req.body.project_id }, {
        $push: {
            right_swipe: { userID: userIdValue }
        },
        $inc: {
            right_count: 1
        }
    }, {
        new: true,
        useFindAndModify: true,
    }).then((ress) => {
        // console.log(ress);

        return res.status(200).send({ message: "swiped right successfull!" });
    }).catch((err) => {
        // console.log(err);
        return res.status(400).send({ error: 'something went wrong' });
    })
});

//    @route '/account/feed/liveprojects/leftswipe'
//            user feed left-swipe

router.post('/liveprojects/leftswipe', authenticate, (req, res) => {

    const userIdValue = req.userIdValue;
    ProjectPost.findOneAndUpdate({ _id: req.body.project_id }, {
        $push: {
            left_swipe: { userID: userIdValue }
        },
        $inc: {
            left_count: 1
        }
    }, {
        new: true,
        useFindAndModify: true,
    }).then((ress) => {
        // console.log(ress);
        return res.status(200).send({ message: "swiped left successfull!" });
    }).catch((err) => {
        // console.log(err);
        return res.status(400).send({ error: 'something went wrong' });
    })
});

router.get('/liveprojects/favprojects', authenticate, (req, res) => {

    // const userIdValue = req.userIdValue;
    ProjectPost.find({
        right_swipe: { $elemMatch: { userID: req.userID } }

    }).populate('organization_id').exec((err, favProjects) => {
        if (err === null) {
            return res.status(200).send(favProjects);
        }
        else {
            return res.status(400).send({ error: "something went wrong!!" });
        }
    })
});

// @route  '/account/feed/liveprojects/matched
// @desc   get matched projects for user/students
router.get('/liveprojects/matched', authenticate, (req, res) => {

    // const userIdValue = req.userIdValue;
    ProjectPost.find({
        matched: { $elemMatch: { userID: req.userID } }

    }).populate('organization_id').exec((err, matchedProjects) => {
        if (err === null) {
            return res.status(200).send(matchedProjects);
        }
        else {
            return res.status(400).send({ error: "something went wrong!!" });
        }
    })
});


// for development
router.post('/liveprojects/removeswipe', authenticate, (req, res) => {


    ProjectPost.updateMany({
        $unset: {
            right_swipe: 1,
            left_swipe: 1,
            right_count: 1,
            left_count: 1
        }
    }).then((ress) => {
        console.log(ress);
        return res.status(200).send({ message: "swiped removed successfull!" });
    }).catch((err) => {
        console.log(err);
        return res.status(400).send({ error: 'something went wrong' });
    })
});


module.exports = router;