import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';

import { getItineraries, getUserItineraries, getItinerary, 
  createItinerary, editItinerary, deleteItinerary, clearItinerariesFromState } from "./actions/itinerary_actions"

import { getAttractions, getAttraction, getItineraryAttractions, createAttraction, deleteAttraction, clearAttractionsFromState } from "./actions/attraction_actions"

import {editUser} from "./actions/user_actions"

document.addEventListener('DOMContentLoaded', () => {
  
  let store;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };
    store = configureStore(preloadedState);
    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/';
    }
  } else {
    store = configureStore({});
  }
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  //itinerary
  window.getItineraries = getItineraries;
  window.getUserItineraries = getUserItineraries;
  window.getItinerary = getItinerary;
  window.createItinerary = createItinerary;
  window.editItinerary = editItinerary;
  window.deleteItinerary = deleteItinerary;
  window.clearItinerariesFromState = clearItinerariesFromState;
  //attraction
  window.getAttractions = getAttractions;
  window.getAttraction = getAttraction;
  window.getItineraryAttractions = getItineraryAttractions;
  window.createAttraction = createAttraction;
  window.deleteAttraction = deleteAttraction;
  window.clearAttractionsFromState = clearAttractionsFromState;
  //user
  window.editUser = editUser;
  const root = document.getElementById('root');

  ReactDOM.render(<Root store={store} />, root);
});
