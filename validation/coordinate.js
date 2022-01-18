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

    if (!isLongitude(data.line_lng1)) {
        coordinateErrors.line_lng1 = 'Line Lng 1 field is invalid';
    }

    if (!isLatitude(data.line_lat1)) {
        coordinateErrors.line_lat1 = 'Line Lat 1 is invalid';
    }

    if (!isLongitude(data.line_lng2)) {
        coordinateErrors.line_lng2 = 'Line Lng 2 is invalid';
    }

    if (!isLatitude(data.line_lat2)) {
        coordinateErrors.line_lat2 = 'Line Lat 2 is invalid';
    }

    return {
        coordinateErrors,
        isValidCoordinate: Object.keys(coordinateErrors).length === 0
    };
};