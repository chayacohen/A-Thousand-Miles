const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Attraction = require("../../models/Attraction");
// const User = require("../../models/User");
const validateAttractionInput = require("../../validation/attraction");

router.get('/', (req, res) => {
    Attraction.find()
        .then(attractions => res.json(attractions))
        .catch(err => res.status(404).json({ message: 'No attractions found' }));
});

router.get('/itinerary/:itinerary_id', (req, res) => {
    if (req.body.boolean === true ){
        // debugger
        Attraction.find({ itinerary: req.params.itinerary_id, isAdded: true })
            .then(attractions => res.json(attractions))
            .catch(err =>
                res.status(404).json({ message: 'No attractions found from that itinerary' }
                )
            );
    }
    else {
        // debugger
        Attraction.find({ itinerary: req.params.itinerary_id})
            .then(attractions => res.json(attractions))
            .catch(err =>
                res.status(404).json({ message: 'No attractions found from that itinerary' }
                )
            );
    }
});

router.get('/:id', (req, res) => {
    Attraction.findById(req.params.id)
        .then(attraction => res.json(attraction))
        .catch(err =>
            res.status(404).json({ message: 'No attraction found with that ID' })
        );
});

router.post('/itinerary/:itinerary_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateAttractionInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }
        const newAttraction = new Attraction({
            itinerary: req.params.itinerary_id,
            lat: req.body.lat,
            lng: req.body.lng,
            title: req.body.title,
            rating: req.body.rating,
            photoUrl: req.body.photoUrl,
            googleMapLink: req.body.googleMapLink,
            placeId: req.body.placeId,
            icon: req.body.icon
            // isAdded: false
        });
        newAttraction.save().then(attraction => res.json(attraction));
    }
);

router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Attraction.findById(req.params.id)
            .then(attraction => {
                attraction.isAdded = (!req.body.isAdded) ? attraction.isAdded : req.body.isAdded;
                attraction.address = (!req.body.address) ? '' : req.body.address;
                attraction.save()
                res.json(attraction);
            })
            .catch(err =>
                res.status(404).json({ message: 'No attraction found with that ID' })
            );
    }
);


router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Attraction.findById(req.params.id)
            .then(attraction => {
                attraction.remove()
                res.json(attraction)
            })
            .catch(err =>
                res.status(404).json({ message: 'No attraction found with that ID' })
            );
    }
);



module.exports = router;