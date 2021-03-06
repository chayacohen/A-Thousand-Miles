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
    rating: {
        type: Number,
        // required: true
    },
    title: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        // required: true
    },
    googleMapLink: {
        type: String,
        // required: true
    },
    placeId: {
        type: String,
        // required: true
    },
    isAdded: {
        type: Boolean,
        default: false
    }, 
    icon: {
        type: String,  
    }, 
    address: {
        type: String,
    }
    
}, {
    timestamps: true
})

module.exports = Attraction = mongoose.model('attractions', AttractionSchema);