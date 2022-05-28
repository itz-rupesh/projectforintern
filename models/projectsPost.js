const mongoose = require('mongoose');
Schema = mongoose.Schema;

const ProjectPosts = mongoose.Schema({
    organization_id: {
        type: 'ObjectId',
        ref: 'organization',
    },
    email: String,
    organization_name: String,
    title: String,
    islive: Boolean,
    post_date: {
        type: Date,
        default: Date.now
    },
    start_date: Date,
    end_date: Date,
    memebers_required: Number,
    technologies: [String],
    role: String,
    description: String,
    work_type: String,
    location: String,
    compensation: String,
    left_count: {
        type: Number,
        default: 0
    },
    right_count: {
        type: Number,
        default: 0
    },
    matched_count: {
        type: Number,
        default: 0
    },
    unmatched_count: {
        type: Number,
        default: 0
    },
    right_swipe: [{
        userID: {
            type: 'ObjectId',
            ref: 'user',
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    left_swipe: [{
        userID: {
            type: 'ObjectId',
            ref: 'user',
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    matched: [{
        userID: {
            type: 'ObjectId',
            ref: 'user',
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    unmatched: [{
        userID: {
            type: 'ObjectId',
            ref: 'user',
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model('projectposts', ProjectPosts);
