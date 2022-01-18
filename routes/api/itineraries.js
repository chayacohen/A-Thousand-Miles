const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Itinerary = require("../../models/Itinerary");
const User = require("../../models/User");
const validateItineraryInput = require("../../validation/itinerary");

router.get('/', (req, res) => {
    Itinerary.find()
        .then(itineraries => res.json(itineraries))
        .catch(err => res.status(404).json({ notweetsfound: 'No itineraries found' }));
});

router.get('/user/:user_id', (req, res) => {
    Itinerary.find({ user: req.params.user_id })
        .then(itineraries => res.json(itineraries))
        .catch(err =>
            res.status(404).json({ notweetsfound: 'No itineraries found from that user' }
            )
        );
});

router.get('/:id', (req, res) => {
    Itinerary.findById(req.params.id)
        .then(itinerary => res.json(itinerary))
        .catch(err =>
            res.status(404).json({ notweetfound: 'No itinerary found with that ID' })
        );
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateItineraryInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newItinerary = new Itinerary({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            start_address: req.body.start_address,
            end_address: req.body.end_address,
            start_lat: req.body.start_lat,
            start_lng: req.body.start_lng,
            end_lat: req.body.end_lat,
            end_lng: req.body.end_lng,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
        });
    
        User.findById(req.user.id)
            .then(user => console.log(user))

        newItinerary.save()
            .then(itinerary => {
                User.findById(req.user.id)
                    .then(user => {
                        user.itineraries.push(itinerary)
                        user.save();
                    })
                res.json(itinerary)
            })
            .catch(err => console.log(err));
    }
);

module.exports = router;