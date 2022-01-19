import axios from "axios";

export const getAttractions = () => {
    return axios.get('/api/attractions')
};

export const getItineraryAttractions = itineraryId => {
    return axios.get(`/api/attractions/itinerary/${itineraryId}`)
};

export const getAttraction = id => {
    return axios.get(`/api/attractions/${id}`)
};

export const createAttraction = (itineraryId, data) => {
    return axios.post(`/api/attractions/itinerary/${itineraryId}`, data)
};

export const deleteAttraction = id => {
    return axios.delete(`/api/attractions/${id}`)
};