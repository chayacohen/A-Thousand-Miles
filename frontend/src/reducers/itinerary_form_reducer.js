import { RECEIVE_TITLE ,RECEIVE_DESCRIPTION, RECEIVE_STARTING_ADDRESS, RECEIVE_END_ADDRESS, CLEAR_ITINERARY_FORM } from "../actions/itinerary_form_actions";


const defaultState = {}; 

const ItineraryFormReducer = (state = defaultState, action) => {

    Object.freeze(state); 
    
    switch(action.type) {
        case RECEIVE_STARTING_ADDRESS: 
            return Object.assign({}, state, {starting: action.address})
        case RECEIVE_END_ADDRESS: 
            return Object.assign({}, state, {ending: action.address})
        case RECEIVE_TITLE: 
            return Object.assign({}, state, {title: action.title})
        case RECEIVE_DESCRIPTION: 
            return Object.assign({}, state, {description: action.description})
        case CLEAR_ITINERARY_FORM: 
            return {};
        default: 
            return state; 
    }
}

export default ItineraryFormReducer; 