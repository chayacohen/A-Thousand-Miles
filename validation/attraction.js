const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateAttractionInput(data) {
    let errors = {};

    data.title = validText(data.title) ? data.title : '';


    if (Validator.isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }

    if (Validator.isEmpty(data.lat)) {
        errors.lat = 'Lat field is required';
    }

    if (!Validator.isFloat(data.lat)) {
        errors.lat = 'Lat must be a float';
    }

    if (Validator.isEmpty(data.lng)) {
        errors.lng = 'Lng field is required';
    }
    
    if (!Validator.isFloat(data.lng)) {
        errors.lng = 'Lng must be a float';
    }

    if (!Validator.isFloat(data.rating)) {
        errors.lng = 'Rating must be a float';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};