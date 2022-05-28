const express = require('express');
const router = express.Router();
require('../conn');  // importing connection objects    
const Organization = require('../models/organization');
const ProjectPosts = require('../models/projectsPost');
const bcrypt = require('bcryptjs');
const orgAuthenticate = require('../middleware/orgAuthenticate');

const info = require('./orgInfo');
router.use('/info', info);    // fatch data for dashboard
const orgfeed = require('./orgFeed');
router.use('/feed', orgfeed);

router.get('/verify', orgAuthenticate, (req, res) => {
    console.log("org verification");
    return res.status(200).send({ message: "Organization login successfully",type:"ORGANIZATION",image:req.rootUser.documents.logo, name:req.rootUser.name });
});


router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please enter all data" });
    }
    try {
        // CHECKING EMAIL IS ALREADY EXIST OR NOT
        const emailExist = await Organization.findOne({ email: email });
        if (emailExist) {
            return res.status(400).json({ error: "Email already Exist" });
        }
        // OTHERWISE SAVE DATA ON DATABASE
        const organization = new Organization({
            name: name,
            email: email,
            password: password
        });
        await organization.save();
        // GENERATION A TOKEN
        const token = await organization.generateAuthToken();
        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 2589000000),
            httpOnly: true
        });
        return res.status(200).json({ message: 'organization registered Successfully!',image:organization.documents.logo,name:organization.name });

    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {        // checking all the recorded
        return res.status(400).json({ error: "Please enter all data" });
    }

    try {
        const organization = await Organization.findOne({ email: email });
        if (organization) {
            const isMatch = await bcrypt.compare(password, organization.password);
            if (isMatch) {
                const token = await organization.generateAuthToken();
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 2589000000),
                    httpOnly: true
                });
                res.status(200).json({ message: "organization Signin Successfully!", image: organization.documents.logo, name: organization.name });
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


router.post('/setup', orgAuthenticate, async (req, res) => {

    try {
        const { technologies, about, documents, socialLinks, locations, achievements } = req.body;
        const result = await Organization.findOneAndUpdate({ _id: req.userID }, {
            $set: {
                technologies, about, documents, socialLinks, locations, achievements
            }
        }, {
            new: true,
            useFindAndModify: true
        });
        if (result === null) {
            throw new Error('User not found');
        }
        res.status(200).send({ message: 'Profile Updated Successfully!', image: result.documents.logo, name: result.name });

    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: "something went wrong" });
    }
});

router.post('/newpost', orgAuthenticate, async (req, res) => {
    try {
        const { title, start_date, memebers_required, technologies, description, role, work_type, location, compensation } = req.body;
        console.log(req.userIdValue);
        const myid = req.userIdValue;
        const newpost = new ProjectPosts({
            organization_id: myid,
            email: req.rootUser.email,
            organization_name: req.rootUser.name,
            islive: true,
            title: title,
            start_date: start_date,
            memebers_required: memebers_required,
            technologies: technologies,
            description: description,
            role: role,
            work_type: work_type,
            location: location,
            compensation: compensation
        });
        const saved = await newpost.save();  // saving project post along with organization ID
        // creating reference in organization collection
        const orgUpdate = await Organization.findOneAndUpdate({ _id: req.userID },
            {
                $push: {
                    "projects": newpost._id.valueOf()
                }
            }, {
            new: true,
            useFindAndModify: true,
        });

        return res.status(200).send({ message: "posted successfully!", savedpost: saved });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: "something went wrong" });
    }
})

router.get('/seepost', orgAuthenticate, (req, res) => {

    const posts = Organization.findOne({ _id: req.userID }).populate('projects').exec((err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).send(err);
        } else {

            return res.status(200).send(docs);
        }
    });

});
router.get('/dolive', orgAuthenticate, (req, res) => {

    ProjectPosts.updateMany({ $set: { islive: true } }).then((ress) => {
        console.log(ress);
        return res.send(ress);
    }).catch((err) => {
        console.log(err);
        return res.send(err);
    })

});

router.post('/archive', orgAuthenticate, async (req, res) => {
    try {
        const result = await ProjectPosts.findOneAndUpdate({ _id: req.body._id }, {
            $set: {
                islive: false
            }
        }, {
            new: true,
            useFindAndModify: true,
        });
        res.status(200).send({ message: "added into past projects" });
    } catch (err) {
        res.status(400).send({ error: "something went wrong !!" });
    }
});

module.exports = router;