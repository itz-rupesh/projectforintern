const express = require('express');
const router = express.Router();
const LiveChat = require('../models/liveChat');
require('../conn');
const authenticate = require('../middleware/authenticate'); // middleware for JWT authentication
const orgAuthenticate = require('../middleware/orgAuthenticate'); // middleware for JWT authentication




// ****************** live chat api's for user/stundets :: START ************************ 

// @route '/livechat/user/getchat'
// @decs  to get all chat data for user/student

router.get('/user/getchat', authenticate, async (req, res) => {
    try {
        LiveChat.find({ user: req.userID }).then((result) => {
            // console.log(result);
            return res.status(200).send(result);
        }).catch((err) => {
            // console.log(err);
            return res.status(400).send({ error: "something went wrong" });
        });
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ error: "something went wrong" });
    }
});

// @route '/livechat/user/newmessage'
// @decs  add new message from user/student

router.post('/user/newmessage', authenticate, async (req, res) => {
    const user_id = req.userIdValue;
    // console.log(user_id);
    const { coversation_id, reciever, msg } = req.body;
    const message = {
        sender: user_id,
        reciever: reciever,
        text: msg
    }
    // console.log(message);
    try {
        LiveChat.findByIdAndUpdate({ _id: coversation_id },
            {
                $push: { messages: message },
                $inc: { messages_count: 1, $unseen_count_by_org: 1 }
            },
            {
                new: true,
                useFindAndModify: true,
            }
        ).then((ress) => {
            // console.log(ress);
            return res.status(200).send({ message: "message sent successfully!", newMessage: ress.messages[ress.messages.length - 1] });
        }
        ).catch((err) => {
            // console.log(err);
            return res.status(400).send({ error: "something went wrong!" });
        });
    } catch (err) {
        return res.status(400).send({ error: "something went wrong" });
    }
});


// @route '/livechat/user/setseen'
// @decs  set all message seen for any given sender

router.post('/user/setseen', authenticate, async (req, res) => {

    const { conversation_id, sender } = req.body;
    // console.log(message);
    try {
        LiveChat.updateOne({ _id: conversation_id },
            {
                "$set": {
                    "messages.$[x].seen": true
                }
            },
            {
                "arrayFilters": [
                    {
                        "x.sender": sender  // given sender
                    }
                ]
            }
        ).then((ress) => {
            // console.log(ress);
            return res.status(200).send({ message: "all messages are seen!" });
        }
        ).catch((err) => {
            console.log(err);
            return res.status(400).send({ error: "something went wrong!" });
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: "something went wrong!" });
    }
})

// ****************** live chat api's for user/stundets :: END ************************
//                       >< >< >< >< >< >< >< >< >< >< >< >< ><
// ****************** live chat api's for Organization :: START ************************

// @route '/livechat/org/getchat'
// @decs  to get all chat data for Organization

router.get('/org/getchat', orgAuthenticate, async (req, res) => {
    try {
        LiveChat.find({ organization: req.userID }).then((result) => {
            // console.log(result);
            return res.status(200).send(result);
        }).catch((err) => {
            // console.log(err);
            return res.status(400).send({ error: "something went wrong" });
        });
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ error: "something went wrong" });
    }
});


// @route '/livechat/org/newmessage'
// @decs  add new message from organization

router.post('/org/newmessage', orgAuthenticate, async (req, res) => {
    const user_id = req.userIdValue;
    console.log(user_id);
    const { coversation_id, reciever, msg } = req.body;
    const message = {
        sender: user_id,
        reciever: reciever,
        text: msg
    }
    console.log(message);
    try {
        LiveChat.findByIdAndUpdate({ _id: coversation_id },
            {
                $push: { messages: message },
                $inc: { messages_count: 1, $unseen_count_by_org: 1 }
            },
            {
                new: true,
                useFindAndModify: true,
            }
        ).then((ress) => {
            // console.log(ress);
            return res.status(200).send({ message: "message sent successfully!", newMessage: ress.messages[ress.messages.length - 1] });
        }
        ).catch((err) => {
            // console.log(err);
            return res.status(400).send({ error: "something went wrong!" });
        });
    } catch (err) {
        return res.status(400).send({ error: "something went wrong!" });
    }
});

// @route '/livechat/org/setseen'
// @decs  set all message seen for any given sender

router.post('/org/setseen', orgAuthenticate, async (req, res) => {

    const { conversation_id, sender } = req.body;
    // console.log(message);
    try {
        LiveChat.updateOne({ _id: conversation_id },
            {
                "$set": {
                    "messages.$[x].seen": true
                }
            },
            {
                "arrayFilters": [
                    {
                        "x.sender": sender  // given sender
                    }
                ]
            }

        ).then((ress) => {
            // console.log(ress);
            return res.status(200).send({ message: "all messages are seen!" });
        }
        ).catch((err) => {
            console.log(err);
            return res.status(400).send({ error: "something went wrong!" });
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: "something went wrong!" });
    }
})

// ****************** live chat api's for Organization :: END ************************ 
module.exports = router;