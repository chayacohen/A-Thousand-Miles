export const RECEIVE_STARTING_ADDRESS = "RECEIVE_STARTING_ADDRESS";
export const RECEIVE_END_ADDRESS = "RECEIVE_END_ADDRESS"; 
export const CLEAR_ITINERARY_FORM = "CLEAR_ITINERARY_FORM"

export const receiveStartingAddress = (address) => ({
    type: RECEIVE_STARTING_ADDRESS, 
    address
})

export const receiveEndAddress = (address) => ({
    type: RECEIVE_END_ADDRESS, 
    address
})

export const clearItineraryForm = () => ({
    type: CLEAR_ITINERARY_FORM,
})
