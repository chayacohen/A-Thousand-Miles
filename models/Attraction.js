const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttractionSchema = new Schema({
    itinerary: {
        type: Schema.Types.ObjectId,
        ref: 'itineraries'
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = Attraction = mongoose.model('attractions', AttractionSchema);