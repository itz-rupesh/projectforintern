
const express = require('express');
const router = express.Router();
// const User = require('../models/user');
const ProjectPost = require('../models/projectsPost');
const LiveChat = require('../models/liveChat');
const User = require('../models/user');
require('../conn');  // importing connection objects
const orgAuthenticate = require('../middleware/orgAuthenticate'); // middleware for JWT authentication
// const organization = require('../models/organization');

const userProfileForOrg = require('./userProfileForOrg');
const organization = require('../models/organization');
router.use('/userprofile', userProfileForOrg);

//    @route '/org/feed/liveprojects'
//            user feed for live projects 

router.get('/liveprojects', orgAuthenticate, async (req, res) => {
    // const myid = req.userID;
    try {
        ProjectPost.find({
            $and: [
                { organization_id: req.userID },
                { islive: true }
            ]
        }).populate('right_swipe.userID').exec((err, project) => {
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


router.get('/docandrating', orgAuthenticate, (req, res) => {
    const data = organization.findOne({ _id: req.userID }, { _id: 0, documents: 1, current_rating: 1 }).then((result) => {
        // console.log(result);
        res.status(200).send(result);
    }).catch((err) => {
        // console.log(err);
        res.status(400).send({ error: "something went wrong" });
    });
})
//    @route '/org/feed/liveprojects/rightswipe'
//            user feed right-swipe

router.post('/liveprojects/rightswipe', orgAuthenticate, async (req, res) => {

    // ******************************************
    //  Swipe the user profile / matched :: START
    ProjectPost.findOneAndUpdate({ _id: req.body.project_id }, {
        $push: {
            matched: { userID: req.body.user_id }
        },
        $pull: {
            right_swipe: { userID: req.body.user_id }
        },
        $inc: {
            matched_count: 1,
            // right_count: -1
        }
    }, {
        new: true,
        useFindAndModify: true,
    }).then((ress) => {

        // checking chat is already enabled or not for this perticular user and organization 
        LiveChat.findOne({ $and: [{ organization: req.userID }, { user: req.body.user_id }] })
            .then((resa) => {
                // console.log("ressssssssssss", resa);
                if (resa) {           // check if no users mathced before
                    return res.status(200).send({ message: `Matched Successfull!!` });
                }
                // ***********************************************
                // geting user data from user collection  :: START
                // console.log("**********************************************");
                User.findOne({ _id: req.body.user_id }, { profile_image: 1, name: 1, email: 1 }).then((user_Data) => {
                    // console.log("user_Data", user_Data);

                    //  *******************************************************************
                    //  creating chat document for mathced user and org into LiveChat  collecion :: START

                    const orgid = req.userIdValue;
                    const userid = req.body.user_id;
                    const newChat = new LiveChat({
                        members: [userid, orgid],
                        user: userid,
                        organization: orgid,
                        user_image: user_Data.profile_image,
                        user_email: user_Data.email,
                        user_name: user_Data.name,
                        org_image: req.rootUser.documents.logo,
                        org_name: req.rootUser.name,
                        org_email: req.rootUser.email,
                    });
                    newChat.save().then((saved) => {
                        // console.log(saved);
                    }).catch((err) => {
                        // console.log("svaed new contact =========", err);
                        return res.status(400).send({ error: 'something went wrong' });
                    });

                    //  creating chat document for mathced user and org into LiveChat  collecion :: END
                    //  **********************************************************************************
                }).catch((err) => {
                    // console.log("end of user data ======", err);
                    return res.status(400).send({ error: 'something went wrong' });
                });

                // geting user data from user collection  :: END
                // **************************************************
            }).catch((err) => {
                // console.log("end of ==========", err);
            })

        // console.log(ress);
        return res.status(200).send({ message: `Matched Successfull!!` });
    }).catch((err) => {
        // console.log("last end ============", err);
        return res.status(400).send({ error: 'something went wrong' });
    })
    //  Swipe the user profile / matched :: END
    //  *****************************************

});

router.post('/liveprojects/test', orgAuthenticate, async (req, res) => {
    // try {
    LiveChat.findOne({ $and: [{ organization: req.userID }, { user: req.body.user_id }] })
        .then((res) => {
            if (res)
                console.log("================= res : ", res);

        }).catch((err) => {
            console.log("================= error : ", err);
        })
    // console.log(data);
    // if (data.length === 0) {
    //     return res.status(200).send({ message: `not  Successfull!!` });
    // }
    // else {
    //     console.log(data);
    //     return res.status(200).send({ message: `matched Successfull!!` });
    // }

    // } catch (err) {
    //     console.log(err);
    // }
});
//    @route '/org/feed/liveprojects/leftswipe'
//            user feed left-swipe

router.post('/liveprojects/leftswipe', orgAuthenticate, (req, res) => {

    ProjectPost.findOneAndUpdate({ _id: req.body.project_id }, {
        $push: {
            unmatched: { userID: req.body.user_id }
        },
        $pull: {
            right_swipe: { userID: req.body.user_id }
        },
        $inc: {
            unmatched_count: 1
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

//  @route  '/org/feed/liveprojects/matched'
//  @desc   to get matched profiles with org's live projects

router.get('/liveprojects/matched', orgAuthenticate, async (req, res) => {
    // const myid = req.userID;
    try {
        ProjectPost.find({
            $and: [
                { organization_id: req.userID },
                { islive: true }
            ]
        }).populate('matched.userID').exec((err, project) => {
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


router.get('/liveprojects/favprojects', orgAuthenticate, (req, res) => {

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
// for development
router.post('/liveprojects/removeswipe', orgAuthenticate, (req, res) => {


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