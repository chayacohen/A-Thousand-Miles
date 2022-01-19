import {
    RECEIVE_ATTRACTIONS,
    RECEIVE_ITINERARY_ATTRACTIONS,
    REMOVE_ATTRACTION,
    RECEIVE_ATTRACTION
} from '../actions/attraction_actions';

const addKeyToObject = (state, action) => {
    let nextState = Object.assign({}, state);
    action.attractions.data.forEach(attraction => {
        nextState[attraction._id] = attraction;
    })
    return nextState;
}

const AttractionsReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_ATTRACTIONS:
            // return Object.assign({}, state, action.itineraries.data);
            return addKeyToObject(state, action);
        case RECEIVE_ITINERARY_ATTRACTIONS:
            return addKeyToObject(state, action);
        case RECEIVE_ATTRACTION:
            return Object.assign({}, state, { [action.attraction.data._id]: action.attraction.data });
        case REMOVE_ATTRACTION:
            delete nextState[action.attraction.data._id];
            return nextState;
        default:
            return state;
    }
};

export default AttractionsReducer;