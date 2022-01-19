import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
<<<<<<< HEAD
import itineraries from './itineraries_reducer'; 
import ui from './itinerary_form_reducer'
=======
import entities from './entities_reducer';
import modal from './modal_reducer'

>>>>>>> main
const RootReducer = combineReducers({
    entities,
    session,
    errors,
<<<<<<< HEAD
    itineraries, 
    ui
=======
    modal
>>>>>>> main
});

export default RootReducer;