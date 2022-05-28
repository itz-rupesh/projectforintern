const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
Schema = mongoose.Schema;

const Organization = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },

    technologies: [String],
    about: String,
    documents: {
        logo: {
            type: String,
            default: "https://res.cloudinary.com/projectforintern/image/upload/v1652340363/omtaguqb3jdosf4p9anj.jpg"
        },
        cover: {
            type: String,
            default: "https://res.cloudinary.com/projectforintern/image/upload/v1652340428/zypbjlfojsuy6cohbpbm.jpg"
        },
        supportiveDoc: String
    },
    socialLinks: [{
        icon: String,
        link: String
    }],
    locations: [{
        city: String,
        address: String
    }],
    achievements: [{
        title: String,
        document: String,
        description: String,
    }],
    projects: [{
        type: 'ObjectId',
        ref: 'projectposts'
    }],
    current_rating: {
        type: Number,
        default: 0
    },
    rating: [{
        user: {
            type: 'ObjectId',
            ref: 'user'
        },
        user_name: String,
        experience: String,
        feedback: String,
        star: Number,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    tokens: [
        {
            token: {
                type: String,
                require: true
            }
        }
    ]
});

// HASHING A PASSWORD 
Organization.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});


// GENERATING TOKEN FOR LOGIN
Organization.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();

        return token;
    } catch (err) {
        console.log(err);
    }
}

module.exports = mongoose.model('organization', Organization);


