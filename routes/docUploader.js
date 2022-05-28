const express = require('express');
const router = express.Router();
require('../conn');  // importing connection objects 
const authenticate = require('../middleware/authenticate');
const orgAuthenticate = require('../middleware/orgAuthenticate');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
// CLOUDINARY CONNECTION
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_DBNAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,

});
router.use(
    fileUpload({
        createParentPath: true,
        useTempFiles: true,
    })
);

//  @path  /document/org/uploader
//  @desc  upload documents for organixation
router.post("/org/uploader", orgAuthenticate, async (req, res) => {

    try {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }
        const file = req.files.postDoc;
        await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
            if (err !== undefined) {
                return res.status(400).send({ error: "something went wrong!! please try again." });
            }

            console.log("result", result.url);
            return res.status(200).send({ message: "uploaded successfully!", url: result.url });
            // const upfile = new Upload_File({
            //     imageUrl: result.url
            // })     
            // console.log(upfile);
            // upfile.save().then((ress) => {
            //     console.log(ress)
            //     return res.send({ status: "success", link: ress.imageUrl });
            // }).catch((errr) => {
            //     console.log(errr);
            //     return res.send({ error: "something went wrong" });
            // });
        })
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: "something went wrong!" });
    }
})
//  @route  /document/user/uploader
//  @desc  upload documents for user/student
router.post("/user/uploader", authenticate, async (req, res) => {

    try {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }
        const file = req.files.postDoc;
        await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
            if (err !== undefined) {
                return res.status(400).send({ error: "something went wrong!! please try again." });
            }

            console.log("result", result.url);
            return res.status(200).send({ message: "uploaded successfully!", url: result.url });
        })
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: "something went wrong!" });
    }
})

module.exports = router;