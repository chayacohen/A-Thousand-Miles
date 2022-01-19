import * as ItineraryApiUtil from '../util/itinerary_api_util';

export const RECEIVE_ITINERARIES = "RECEIVE_ITINERARIES"; // all itineraries
export const RECEIVE_USER_ITINERARIES = "RECEIVE_USER_ITINERARIES"; // user's itineraries
export const RECEIVE_NEW_ITINERARY = "RECEIVE_ITINERARY"; // get/create itinerary
export const REMOVE_ITINERARY = "REMOVE_ITINERARY"; // destroy itinerary
export const RECEIVE_ITINERARY = "RECEIVE_ITINERARY"; // get/create/edit itinerary

export const receiveItineraries = itineraries => ({
  type: RECEIVE_ITINERARIES,
  itineraries
});

export const receiveUserItineraries = itineraries => ({
  type: RECEIVE_USER_ITINERARIES,
  itineraries
});

// export const receiveNewItinerary = itinerary => ({
//   type: RECEIVE_NEW_ITINERARY,
//   itinerary
// })

export const receiveItinerary = itinerary => ({
  type: RECEIVE_ITINERARY,
  itinerary
})

// export const updateItinerary = itinerary => ({
//   type: UPDATE_ITINERARY,
//   itinerary
// })

export const removeItinerary = itinerary => ({
  type: REMOVE_ITINERARY,
  itinerary
})


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
    .then(itinerary => dispatch(receiveItinerary(itinerary)))
    .catch(err => console.log(err))
);

export const editItinerary = (id, data) => dispatch => (
  ItineraryApiUtil.editItinerary(id, data)
    .then(itinerary => dispatch(receiveItinerary(itinerary)))
    .catch(err => console.log(err))
);

export const deleteItinerary = (id) => dispatch => (
  ItineraryApiUtil.deleteItinerary(id)
    .then(itinerary => dispatch(removeItinerary(itinerary)))
    .catch(err => console.log(err))
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