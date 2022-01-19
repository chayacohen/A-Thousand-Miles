import { combineReducers } from 'redux';

import SessionErrorsReducer from './session_errors_reducer';
import ItineraryErrorsReducer from './itinerary_errors_reducer';
import AttractionErrorsReducer from './attraction_errors_reducer';
export default combineReducers({
    session: SessionErrorsReducer,
    itinerary: ItineraryErrorsReducer,
    attraction: AttractionErrorsReducer,
});