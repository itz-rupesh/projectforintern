const jwt = require('jsonwebtoken');
const Organization = require('../models/organization');



const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const varifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await Organization.findOne({ _id: varifyToken._id, "tokens.token": token });
        if (!rootUser) { throw new Error('User not found') };
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        req.userIdValue = rootUser._id.valueOf();

        // res.send(rootUser);
        next();
    } catch (err) {
        return res.status(401).send({ error: 'Unauthorizied : Please login again' });
    }
}

module.exports = Authenticate;