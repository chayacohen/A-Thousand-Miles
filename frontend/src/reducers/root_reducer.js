import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import itineraries from './itineraries_reducer'; 
import ui from './itinerary_form_reducer'
const RootReducer = combineReducers({
    session,
    errors,
    itineraries, 
    ui
});

export default RootReducer;