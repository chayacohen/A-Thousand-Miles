import { RECEIVE_STARTING_ADDRESS, RECEIVE_END_ADDRESS, CLEAR_ITINERARY_FORM } from "../actions/itinerary_form_actions";


const defaultState = {}; 

const ItineraryFormReducer = (state = defaultState, action) => {

    Object.freeze(state); 
    
    switch(action.type) {
        case RECEIVE_STARTING_ADDRESS: 
            return {starting: action.address}
        case RECEIVE_END_ADDRESS: 
            return Object.assign({}, state, {ending: action.address})
        case CLEAR_ITINERARY_FORM: 
            return {};
        default: 
            return state; 
    }
}

export default ItineraryFormReducer; 