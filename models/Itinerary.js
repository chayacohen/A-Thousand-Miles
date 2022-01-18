const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItinerarySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    start_address: {
        type: String,
        required: true
    },
    end_address: {
        type: String,
        required: true
    },
    start_lat: {
        type: Number,
        required: true
    },
    start_lng: {
        type: Number,
        required: true
    },
    end_lat: {
        type: Number,
        required: true
    },
    end_lng: {
        type: Number,
        required: true
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    attractions: [
        {
            type: Schema.Types.ObjectId,
            ref: "attractions"
        }
    ]
}, {
    timestamps: true
})

module.exports = Itinerary = mongoose.model('itineraries', ItinerarySchema);