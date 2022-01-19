import {
    RECEIVE_ATTRACTION_ERRORS,
    RECEIVE_ATTRACTION,
    REMOVE_ATTRACTION_ERRORS
} from '../actions/attraction_actions';

const AttractionErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ATTRACTION_ERRORS:
            return Object.values(action.errors);
        case RECEIVE_ATTRACTION:
            return [];
        case REMOVE_ATTRACTION_ERRORS:
            return [];
        default:
            return state;
    }
};

export default AttractionErrorsReducer