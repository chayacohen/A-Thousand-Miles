const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateItineraryInput(data) {
    let errors = {};

    data.title = validText(data.title) ? data.title : '';
    data.description = validText(data.description) ? data.description : '';
    data.start_address = validText(data.start_address) ? data.start_address : '';
    data.end_address = validText(data.end_address) ? data.end_address : '';

    //title
    if (Validator.isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }
    //start address
    if (Validator.isEmpty(data.start_address)) {
        errors.start_address = 'Start address field is required';
    }
    //end address
    if (Validator.isEmpty(data.end_address)) {
        errors.end_address = 'End address field is required';
    }
    //start lat
    if (Validator.isEmpty(data.start_lat)) {
        errors.start_lat = 'Starting lat field is required';
    }

    if (!Validator.isFloat(data.start_lat)) {
        errors.start_lat = 'Starting lat must be a float';
    }
    //start lng
    if (Validator.isEmpty(data.start_lng)) {
        errors.start_lng = 'Starting lng field is required';
    }

    if (!Validator.isFloat(data.start_lng)) {
        errors.start_lng = 'Starting lng must be a float';
    }
    //end lat
    if (Validator.isEmpty(data.end_lat)) {
        errors.end_lat = 'Ending lat field is required';
    }

    if (!Validator.isFloat(data.end_lat)) {
        errors.end_lat = 'Ending lat must be a float';
    }
    //end lng
    if (Validator.isEmpty(data.end_lng)) {
        errors.end_lng = 'Ending lng field is required';
    }

    if (!Validator.isFloat(data.end_lng)) {
        errors.end_lng = 'Ending lng must be a float';
    }
    //start_date
    if (!Validator.isDate(data.start_date) && data.start_date) {
        errors.start_date = 'Start date must be a date';
    }
    //end_date
    if (!Validator.isDate(data.end_date) && data.end_date) {
        errors.end_date = 'End date must be a date';
    }
    

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};