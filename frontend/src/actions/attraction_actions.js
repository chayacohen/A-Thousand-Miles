import * as AttractionApiUtil from '../util/attraction_api_util';

export const RECEIVE_ATTRACTIONS = "RECEIVE_ATTRACTIONS"; // all attractions
export const RECEIVE_ITINERARY_ATTRACTIONS = "RECEIVE_ITINERARY_ATTRACTIONS"; // itinerary's attractions
export const REMOVE_ATTRACTION = "REMOVE_ATTRACTION"; // destroy attraction
export const RECEIVE_ATTRACTION = "RECEIVE_ATTRACTION"; // get/create attraction

export const receiveAttractions = attractions => ({
    type: RECEIVE_ATTRACTIONS,
    attractions
});

export const receiveItineraryAttractions = attractions => ({
    type: RECEIVE_ITINERARY_ATTRACTIONS,
    attractions
});

export const receiveAttraction = attraction => ({
    type: RECEIVE_ATTRACTION,
    attraction
})

export const removeAttraction = attraction => ({
    type: REMOVE_ATTRACTION,
    attraction
})

export const getAttractions = () => dispatch => (
    AttractionApiUtil.getAttractions()
        .then(attractions => dispatch(receiveAttractions(attractions)))
        .catch(err => console.log(err))
);

export const getAttraction = (id) => dispatch => (
    AttractionApiUtil.getAttraction(id)
        .then(attraction => dispatch(receiveAttraction(attraction)))
        .catch(err => console.log(err))
);

export const getItineraryAttractions = (itineraryId) => dispatch => (
    AttractionApiUtil.getItineraryAttractions(itineraryId)
        .then(attractions => dispatch(receiveItineraryAttractions(attractions)))
        .catch(err => console.log(err))
);

export const createAttraction = (itineraryId, data) => dispatch => (
    AttractionApiUtil.createAttraction(itineraryId, data)
        .then(attraction => dispatch(receiveAttraction(attraction)))
        .catch(err => console.log(err))
);

export const deleteAttraction = (id) => dispatch => (
    AttractionApiUtil.deleteAttraction(id)
        .then(attraction => dispatch(removeAttraction(attraction)))
        .catch(err => console.log(err))
);
