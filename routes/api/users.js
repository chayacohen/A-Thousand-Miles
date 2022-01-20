const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require('bcryptjs');
const keys = require("../../config/keys");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateCoordinateInput = require("../../validation/coordinate");

router.get("/test", (req, res) => {
    res.json({msg: "this is the user route"})
})

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err =>
            res.status(404).json({ message: 'No user found with that ID' })
        );
});

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    const { coordinateErrors, isValidCoordinate } = validateCoordinateInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    if (!isValidCoordinate) {
        return res.status(400).json(coordinateErrors);
    }
    // Check to make sure nobody has already registered with a duplicate email
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                // Throw a 400 error if the email address already exists
                return res.status(400).json({ email: "A user has already registered with this address" })
            } else {
                // Otherwise create a new user
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    address: req.body.address,
                    address_coord: { type: "Point", coordinates: [req.body.lng, req.body.lat]},
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            // .catch(err => console.log(err));
                    })
                })
            }
        })
})

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ email: 'This user does not exist' });
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { 
                            id: user.id, 
                            username: user.username,
                            email: user.email,
                            address: user.address, 
                            address_coord: user.address_coord
                        };

                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        });
                    } else {
                        return res.status(400).json({ password: 'Incorrect password' });
                    }
                })
        })
})

router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        User.findById(req.params.id)
            .then(user => {
                // debugger
                user.username = (!req.body.username) ? user.username : req.body.username;
                // user.username = req.body.username;
                user.address = (!req.body.address) ? user.address : req.body.address;
                // user.address = req.body.address;
                user.save();
                res.json(user)
            })
            .catch(err =>
                res.status(404).json({ message: 'No user found with that ID' })
            );
    }
);

module.exports = router;