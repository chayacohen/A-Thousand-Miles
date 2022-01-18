import { getItineraries, getUserItineraries, createItineraries } from '../util/itinerary_api_util';

// export const RECEIVE_ITINERARIES = "RECEIVE_ITINERARIES";
export const RECEIVE_USER_ITINERARIES = "RECEIVE_USER_ITINERARIES";
export const RECEIVE_NEW_ITINERARY = "RECEIVE_NEW_ITINERARY";

// export const receiveItineraries = itineraries => ({
//   type: RECEIVE_ITINERARIES,
//   itineraries
// });

export const receiveUserItineraries = itineraries => ({
  type: RECEIVE_USER_ITINERARIES,
  itineraries
});

export const receiveNewItinerary = itinerary => ({
  type: RECEIVE_NEW_ITINERARY,
  itinerary
})

// export const fetchItineraries = () => dispatch => (
//   getItineraries()
//     .then(itineraries => dispatch(receiveItineraries(itineraries)))
//     .catch(err => console.log(err))
// );

export const fetchUserItineraries = id => dispatch => (
  getUserItineraries(id)
    .then(itineraries => dispatch(receiveUserItineraries(itineraries)))
    .catch(err => console.log(err))
);

export const makeItinerary = data => dispatch => (
    createItineraries(data)
    .then(itinerary => dispatch(receiveNewItinerary(itinerary)))
    .catch(err => console.log(err))
);