const mongoose = require('mongoose');
Schema = mongoose.Schema;


const LiveChat = mongoose.Schema({

    members: [String],
    messages: [{
        sender: String,
        reciever: String,
        text: String,
        seen: {
            type: Boolean,
            default: false
            // type: String,
            // enum: ['True', 'False'],
            // default: 'False'
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    user: {
        type: 'ObjectId',
        ref: 'user'
    },
    organization: {
        type: 'ObjectId',
        ref: 'organization'
    },
    user_name: String,
    user_email: String,
    user_image: String,

    org_name: String,
    org_email: String,
    org_image: String,

    unseen_count_by_user: {
        type: Number,
        default: 0
    },
    unseen_count_by_org: {
        type: Number,
        default: 0
    },
    messages_count: {
        type: Number,
        default: 0
    }
}, { timestamps: true });



module.exports = mongoose.model('livechat', LiveChat);