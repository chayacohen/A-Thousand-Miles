import { 
  RECEIVE_ITINERARIES,
  RECEIVE_USER_ITINERARIES,
  REMOVE_ITINERARY,
  RECEIVE_ITINERARY,
  REMOVE_ITINERARY_STATE
  } from '../actions/itinerary_actions';

  const addKeyToObject = (state, action) => {
    let nextState = Object.assign({}, state);
    action.itineraries.data.forEach(itinerary => {
      nextState[itinerary._id] = itinerary;
    })
    return nextState;
  }
  
  const ItinerariesReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch(action.type) {
      case RECEIVE_ITINERARIES:
        // return Object.assign({}, state, action.itineraries.data);
        return addKeyToObject(state, action);
      case RECEIVE_USER_ITINERARIES:
        return addKeyToObject(state, action);
      case RECEIVE_ITINERARY:
        return Object.assign({}, state, { [action.itinerary.data._id]: action.itinerary.data });
      case REMOVE_ITINERARY:
        delete nextState[action.itinerary.data._id];
        return nextState;
      case REMOVE_ITINERARY_STATE:
        return {};
      default:
        return state;
    }
  };
  
  export default ItinerariesReducer;