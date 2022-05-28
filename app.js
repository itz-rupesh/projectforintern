
const express = require('express');
const app = express();
const cookiePasder = require('cookie-parser');

const cors = require('cors');
const AuthBoth = require('./middleware/authBoth');
require('dotenv/config');  // FOR HIDDING CREDENTIALS
require('./conn');         // IMPORTING CONNECTION OBJECT FROM conn.js file

// IMPORTING MEDDLEWARE
app.use(cors());
app.use(express.json());
app.use(cookiePasder());
// Importing Routes

const account = require('./routes/posts');
const organization = require('./routes/organization');
const docUploader = require('./routes/docUploader');
const liveChat = require('./routes/liveChat');
const search = require('./routes/search');
app.use('/account', account);
app.use('/org', organization);
app.use('/document', docUploader);
app.use('/livechat', liveChat);
app.use('/search', search);

// default   
app.get('/', (req, res) => {
    res.cookie("myvariable", "value", {
        expires: new Date(Date.now() + 258900),
        httpOnly: true
    });
    res.send('hello world!!');
});


app.get('/verify/user', AuthBoth, async (req, res) => {
    res.status(200).send({ image: req.image, type: req.usertype, name: req.name });
});


if (process.env.NODE_ENV == "production") {
    app.use(express.static("/client/build"));
}


// process.env.PORT ||
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listning on the port ${port}...`));