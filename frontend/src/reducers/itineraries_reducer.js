import { 
  RECEIVE_ITINERARIES,
  RECEIVE_USER_ITINERARIES,
  REMOVE_ITINERARY,
  RECEIVE_ITINERARY
  } from '../actions/itinerary_actions';
  
  const ItinerariesReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch(action.type) {
      case RECEIVE_ITINERARIES:
        return Object.assign({}, state, action.itineraries.data);
      case RECEIVE_USER_ITINERARIES:
        return Object.assign({}, state, action.itineraries.data);;
      case RECEIVE_ITINERARY:
        return Object.assign({}, state, { [action.itinerary.data._id]: action.itinerary.data });
      case REMOVE_ITINERARY:
        delete nextState[action.itinerary.id];
        return nextState;
      default:
        return state;
    }
  };
  
  export default ItinerariesReducer;