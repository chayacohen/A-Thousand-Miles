import { RECEIVE_ITINERARIES, RECEIVE_USER_ITINERARIES, RECEIVE_NEW_ITINERARY } from '../actions/itinerary_actions';
  
  const ItinerariesReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type) {
    //   case RECEIVE_ITINERARIES:
    //     newState.all = action.itineraries.data;
    //     return newState;
      case RECEIVE_USER_ITINERARIES:
        newState.user = action.itineraries.data;
        return newState;
      case RECEIVE_NEW_ITINERARY:
        newState.new = action.itinerary.data
        return newState;
      default:
        return state;
    }
  };
  
  export default ItinerariesReducer;