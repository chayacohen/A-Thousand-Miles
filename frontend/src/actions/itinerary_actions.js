import * as ItineraryApiUtil from '../util/itinerary_api_util';

export const RECEIVE_ITINERARIES = "RECEIVE_ITINERARIES"; // all itineraries
export const RECEIVE_USER_ITINERARIES = "RECEIVE_USER_ITINERARIES"; // user's itineraries
export const REMOVE_ITINERARY = "REMOVE_ITINERARY"; // destroy itinerary
export const RECEIVE_ITINERARY = "RECEIVE_ITINERARY"; // get/create/edit itinerary

export const RECEIVE_ITINERARY_ERRORS = "RECEIVE_ITINERARY_ERRORS"; // get/create/edit itinerary
export const REMOVE_ITINERARY_ERRORS = "REMOVE_ITINERARY_ERRORS"; // get/create/edit itinerary
export const REMOVE_ITINERARY_STATE = "REMOVE_ITINERARY_STATE"; // get/create/edit itinerary

export const receiveItineraries = itineraries => ({
  type: RECEIVE_ITINERARIES,
  itineraries
});

export const receiveUserItineraries = itineraries => ({
  type: RECEIVE_USER_ITINERARIES,
  itineraries
});

export const receiveItinerary = itinerary => ({
  type: RECEIVE_ITINERARY,
  itinerary
})

export const removeItinerary = itinerary => ({
  type: REMOVE_ITINERARY,
  itinerary
})

export const receiveItineraryErrors = (errors) => ({
  type: RECEIVE_ITINERARY_ERRORS,
  errors
});

export const removeItineraryErrors = () => ({
  type: REMOVE_ITINERARY_ERRORS
});

export const removeItinerariesFromState = () => ({
  type: REMOVE_ITINERARY_STATE
})

export const clearItinerariesFromState = () => dispatch => (
  dispatch(removeItinerariesFromState())
);

export const clearItineraryErrors = () => dispatch => (
  dispatch(removeItineraryErrors())
);



export const getItineraries = () => dispatch => (
  ItineraryApiUtil.getItineraries()
    .then(itineraries => dispatch(receiveItineraries(itineraries)))
    .catch(err => console.log(err))
);

export const getUserItineraries = (userId) => dispatch => (
  ItineraryApiUtil.getUserItineraries(userId)
    .then(itineraries => dispatch(receiveUserItineraries(itineraries)))
    .catch(err => console.log(err))
);

export const getItinerary = (id) => dispatch => (
  ItineraryApiUtil.getItinerary(id)
    .then(itinerary => dispatch(receiveItinerary(itinerary)))
    .catch(err => console.log(err))
);

export const createItinerary = (data) => dispatch => (
  ItineraryApiUtil.createItinerary(data)
    .then(itinerary => (dispatch(receiveItinerary(itinerary))), 
    err => (dispatch(receiveItineraryErrors(err.response.data))))
);

export const editItinerary = (id, data) => dispatch => (
  ItineraryApiUtil.editItinerary(id, data)
    .then(itinerary => (dispatch(receiveItinerary(itinerary))),
    err => (dispatch(receiveItineraryErrors(err.response.data))))
);

export const deleteItinerary = (id) => dispatch => (
  ItineraryApiUtil.deleteItinerary(id)
    .then(itinerary => (dispatch(removeItinerary(itinerary))),
    err => (dispatch(receiveItineraryErrors(err.response.data))))
);





// export const fetchUserItineraries = id => dispatch => (
//   ItineraryApiUtil.getUserItineraries(id)
//     .then(itineraries => dispatch(receiveUserItineraries(itineraries)))
//     .catch(err => console.log(err))
// );

// export const makeItinerary = data => dispatch => (
//     createItineraries(data)
//     .then(itinerary => dispatch(receiveNewItinerary(itinerary)))
//     .catch(err => console.log(err))
// );