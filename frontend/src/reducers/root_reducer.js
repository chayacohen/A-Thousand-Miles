import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import itineraries from './itineraries_reducer'
import modal from './modal_reducer'

const RootReducer = combineReducers({
    session,
    errors,
    itineraries,
    modal
});

export default RootReducer;