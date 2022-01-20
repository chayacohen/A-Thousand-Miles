import React from "react"
import { Link } from "react-router-dom";
const ItineraryItem = ({ itinerary, deleteItinerary, editItinerary }) => {
    // debugger;
    return(
        <div>
            <Link to={`/profile/${itinerary._id}`}>Itinerary attraction</Link>
            <br/>
            {itinerary.title}, description: {itinerary.description}, start: {itinerary.start_address}, end: {itinerary.end_address}
            <button onClick={() => deleteItinerary(itinerary._id)}>Delete</button>
        </div>
    );
}

export default ItineraryItem