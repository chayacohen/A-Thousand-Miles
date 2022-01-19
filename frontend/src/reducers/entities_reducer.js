import { combineReducers } from "redux";

import ItinerariesReducer from "./itineraries_reducer";

const entitiesReducer = combineReducers({
    itineraries: ItinerariesReducer,
});

export default entitiesReducer;