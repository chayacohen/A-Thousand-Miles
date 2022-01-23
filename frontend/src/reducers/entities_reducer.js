import { combineReducers } from "redux";

import ItinerariesReducer from "./itineraries_reducer";
import AttractionsReducer from "./attractions_reducer";
import UsersReducer from "./users_reducer";
const entitiesReducer = combineReducers({
    user: UsersReducer,
    itineraries: ItinerariesReducer,
    attractions: AttractionsReducer
});

export default entitiesReducer;