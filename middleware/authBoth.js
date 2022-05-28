const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Organization = require('../models/organization');



const AuthBoth = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const varifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({ _id: varifyToken._id, "tokens.token": token });
        const organization = await Organization.findOne({ _id: varifyToken._id, "tokens.token": token });
        req.token = token;
        if (!user && !organization) { throw new Error('User not found') };
        if (user) {
            req.rootUser = user;
            req.image = user.profile_image;
            req.name = user.name;
            req.usertype = "USER";
            next();
        }
        if (organization) {
            req.rootUser = organization;
            req.image = organization.documents.logo;
            req.name = organization.name;
            req.usertype = "ORGANIZATION";
            next();
        }
        else {
            req.image = "";
            req.name = "";
            req.usertype = "UNAUTHORIZED";
            next();
        }
        next();
    } catch (err) {
        return res.status(401).send({ error: 'Unauthorizied : Please login again', image: "", name: "", type: "UNAUTHORIZED" });
    }
}

module.exports = AuthBoth;