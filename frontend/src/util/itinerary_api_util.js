import axios from 'axios';

export const getItineraries = () => {
  return axios.get('/api/itineraries')
};

export const getUserItineraries = id => {
  return axios.get(`/api/itineraries/user/${id}`)
};

export const createItineraries = data => {
  return axios.post('/api/itineraries/', data)
}