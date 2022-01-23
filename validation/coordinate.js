const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateCoordinateInput(data) {
    let coordinateErrors = {};

    const isLatitude = num => num && Math.abs(num) <= 90;
    const isLongitude = num => num && Math.abs(num) <= 180;

    if (!isLongitude(data.lng)) {
        coordinateErrors.lng = 'Lng field is invalid';
    }

    if (!isLatitude(data.lat)) {
        coordinateErrors.lat = 'Lat field is invalid';
    }

    return {
        coordinateErrors,
        isValidCoordinate: Object.keys(coordinateErrors).length === 0
    };
};