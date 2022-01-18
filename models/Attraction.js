const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttractionSchema = new Schema({
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
    },
    itineraries: [
        {
            type: Schema.Types.ObjectId,
            ref: "itineraries"
        }
    ]
}, {
    timestamps: true
})

module.exports = Attraction = mongoose.model('attractions', AttractionSchema);