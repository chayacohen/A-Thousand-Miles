import axios from "axios";

export const getAttractions = () => {
    return axios.get('/api/attractions')
};

export const getItineraryAttractions = (itineraryId,data) => {
    return axios.get(`/api/attractions/itinerary/${itineraryId}`, data)
};

export const getAttraction = id => {
    return axios.get(`/api/attractions/${id}`)
};

export const createAttraction = (itineraryId, data) => {
    return axios.post(`/api/attractions/itinerary/${itineraryId}`, data)
};

export const editAttraction = (id, data) => {
    return axios.put(`/api/attractions/${id}`, data)
};

export const deleteAttraction = id => {
    return axios.delete(`/api/attractions/${id}`)
};