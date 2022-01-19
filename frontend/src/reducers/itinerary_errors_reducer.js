import {
    RECEIVE_ITINERARY_ERRORS,
    RECEIVE_ITINERARY,
    REMOVE_ITINERARY_ERRORS
} from '../actions/itinerary_actions';

const ItineraryErrorsReducer =(state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ITINERARY_ERRORS:
            return action.errors;
        case RECEIVE_ITINERARY:
            return [];
        case REMOVE_ITINERARY_ERRORS:
            return [];
        default:
            return state;
    }
};

export default ItineraryErrorsReducer