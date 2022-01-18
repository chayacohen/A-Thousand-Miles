const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
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
    address: {
        type: String,
        required: true
    },
    address_coord: {
        type: { type: String }, 
        coordinates: {
            type: [Number],
            // index: "2dsphere"
        }
    },
    line: {
        type: { type: String },
        coordinates: {
            type: [[Number]],
        }
    }
}, {
    timestamps: true
})

// UserSchema.index({ address_coord: '2dsphere' });
module.exports = User = mongoose.model('users', UserSchema);