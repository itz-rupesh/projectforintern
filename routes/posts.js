
const express = require('express');
const router = express.Router();
const User = require('../models/user');
require('../conn');  // importing connection objects
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate'); // middleware for JWT authentication
const { response } = require('express');
// GETTING ALL RECORDS

const info = require('./info');
const userFeed = require('./userFeed');
router.use('/info', info);    // fatch data for dashboard
router.use('/feed', userFeed);

router.get('/verify', authenticate, (req, res) => {
    console.log("user varification");
    return res.status(200).send({ message: "authentic user", type: "USER", image: req.rootUser.profile_image, name: req.rootUser.name });
});



// ADDING NEW RECORDS / USER REGISTRATION

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please enter all data" });
    }
    try {
        // CHECKING EMAIL IS ALREADY EXIST OR NOT
        const emailExist = await User.findOne({ email: email });
        if (emailExist) {
            return res.status(400).json({ error: "Email already Exist" });
        }
        // OTHERWISE SAVE DATA ON DATABASE
        const user = new User({
            name: name,
            email: email,
            password: password
        });
        await user.save();
        // console.log(user);
        // GENERATION A TOKEN
        const token = await user.generateAuthToken();
        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 2589000000),
            httpOnly: true
        });
        return res.status(200).json({ message: 'User registered Successfully!', image: user.profile_image, name: user.name });

    } catch (err) {
        res.json({ message: err });
    }
});

// GETTING SPECIFIC RECORD BY ID / LOGIN 
router.post('/login', async (req, res) => {

    // *******************************
    const { email, password } = req.body;
    if (!email || !password) {        // checking all the recorded
        return res.status(400).json({ error: "Please enter all data" });
    }

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = await user.generateAuthToken();
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 2589000000),
                    httpOnly: true
                });
                res.status(200).json({ message: "User Signin Successfully!", image: user.profile_image, name: user.name });
            }
            else {

                return res.status(400).json({ error: "Invalid Credentials!" });
            }
        }
        else {
            return res.status(400).json({ error: "Invalid Credentials!!!" });
        }
    }
    catch (err) {
        res.status(400).json({ error: "404: some went wrong, please try again" });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('jwtoken');
    return res.status(200).send({ message: 'Logout successful !!' });
})

router.post('/setup', authenticate, async (req, res) => {
    console.log("callled");
    try {
        const { skills, profession, education, projects, achievements, socialLinks } = req.body;
        const result = await User.findOneAndUpdate({ _id: req.userID }, {
            $set: {
                skills: skills,
                profession: profession.profession,
                yoe: profession.yoe,
                education: education,
                projects: projects,
                achievements: achievements,
                socialLinks: socialLinks
            }
        }, {
            new: true,
            useFindAndModify: true
        });
        console.log(result);
        if (result === null) {
            throw new Error('User not found');
        }
        res.status(200).send({ message: 'Profile Updated Successfully!', image: result.profile_image, name: result.name });

    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: "something went wrong" });
    }
});

router.post('/updateimage', authenticate, async (req, res) => {
    User.findOneAndUpdate({ _id: req.userID }, { $set: { profile_image: req.body.url } })
        .then((ress) => {
            // console.log(ress);
            return res.status(200).send({ message: "profile picture upldated!!", type: "USER", name: req.rootUser.name, image: ress.profile_image });

        }).catch((err) => {
            // console.log(err)
            return res.status(400).send({ error: "something went worng!!", type: "UNAUTHORIZED", name: "", image: "" });
        });
});


router.post('/updatedemo', authenticate, async (req, res) => {
    try {
        const result = await User.findOneAndUpdate({ _id: req.userID }, {
            $set: {
                name: 'raju'
            }
        }, {
            new: true,
            useFindAndModify: true
        });
        if (result === null) {
            throw new Error('User not found');
        }
        res.status(200).send({ message: 'Profile Updated Successfully!' });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: 'somthing went wrong, Please try again!' });
    }
})
// DELETE SPECIFIC RECORED
router.delete('/:id', async (req, res) => {
    try {
        const removedUser = await User.deleteOne({ _id: req.params.id });
        res.json(removedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

// UPDATE A RECORD
router.patch('/:id', async (req, res) => {
    try {
        const updatepwd = await User.updateOne({ _id: req.params.id }, { $set: { password: req.body.password } });
        res.json(updatepwd);
    } catch (err) {
        res.json({ message: err });
    }
});



module.exports = router;