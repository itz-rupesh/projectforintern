const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = mongoose.Schema({
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
    profile_image: {
        type: String,
        default: "https://res.cloudinary.com/projectforintern/image/upload/v1652340363/omtaguqb3jdosf4p9anj.jpg"
    },
    skills: [String],
    profession: String,
    yoe: String,
    education: [{
        degree_type: String,
        degree: String,
        college: String,
        yop: Date,
    }],
    projects: [{
        title: String,
        project_type: String,
        link: String,
        technologies: [String],
        role: String,
        description: String,
    }],
    achievements: [{
        title: String,
        document: String,
        description: String,
    }],
    socialLinks: [{
        icon: String,
        link: String
    }],
    current_rating: {
        type: Number,
        default: 0
    },
    rating: [{
        org_name: String,
        organization: {
            type: 'ObjectId',
            ref: 'organizations'
        },
        performance: String,
        role: String,
        technologies: [String],
        start_date: Date,
        end_date: Date,
        feedback: String,
        star: Number,
        certificate: String,
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
User.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

// GENERATING TOKEN FOR LOGIN
User.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

module.exports = mongoose.model('user', User);