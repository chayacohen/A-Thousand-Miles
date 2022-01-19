import axios from 'axios';

export const getItineraries = () => {
  return axios.get('/api/itineraries')
};

export const getUserItineraries = userId => {
  return axios.get(`/api/itineraries/user/${userId}`)
};

export const getItinerary = id => {
  return axios.get(`/api/itineraries/${id}`)
};

export const createItinerary = data => {
  return axios.post('/api/itineraries/', data)
}

export const editItinerary = (id, data) => {
  return axios.put(`/api/itineraries/${id}`, data)
};

export const deleteItinerary = id => {
  return axios.delete(`/api/itineraries/${id}`)
};