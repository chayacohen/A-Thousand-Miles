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
        .catch(err => res.status(404).json({ notweetsfound: 'No attractions found' }));
});

router.get('/itinerary/:itinerary_id', (req, res) => {
    Itinerary.find({ id: req.params.itinerary_id })
        .then(itineraries => res.json(itineraries))
        .catch(err =>
            res.status(404).json({ notweetsfound: 'No attractions found from that itinerary' }
            )
        );
});

router.get('/:id', (req, res) => {
    Attraction.findById(req.params.id)
        .then(attraction => res.json(attraction))
        .catch(err =>
            res.status(404).json({ notweetfound: 'No attraction found with that ID' })
        );
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateAttractionInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        Attraction.findOne({ title: req.body.title})
            .then(attraction => {
                if (attraction) {
                    res.json(attraction)
                } else {
                    const newAttraction = new Attraction({
                        lat: req.body.lat,
                        lng: req.body.lng,
                        title: req.body.title
                    });
                    newAttraction.save().then(attraction => res.json(attraction));
                }
            })

    }
);



module.exports = router;