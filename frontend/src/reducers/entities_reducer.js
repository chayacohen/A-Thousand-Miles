import { combineReducers } from "redux";

import ItinerariesReducer from "./itineraries_reducer";
import AttractionsReducer from "./attractions_reducer";
const entitiesReducer = combineReducers({
    itineraries: ItinerariesReducer,
    attractions: AttractionsReducer
});

export default entitiesReducer;