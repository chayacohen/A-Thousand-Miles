import React from "react"
import { Link } from "react-router-dom";
const ItineraryItem = ({ itinerary, deleteItinerary, editItinerary }) => {
    // debugger;
    return(
        <div className="itinerary-item-container">
            {/* <Link to={`/profile/${itinerary._id}`}> */}
                <div className="itinerary-item">
                    <Link to={`/profile/${itinerary._id}`} className="link-container">
                        <div className="map-temp">

                        </div>
                        <div className="itinerary-item-content-container">
                            <div className="itinerary-title">
                                <h1>{itinerary.title}</h1>
                            </div>
                            <div className="itinerary-address">
                                <div className="address">
                                    <h3>Start Address:</h3>
                                    <span>
                                        {itinerary.start_address}
                                    </span>
                                </div>
                                <div className="address">
                                    <h3>Destination:</h3>
                                    <span>
                                        {itinerary.end_address}
                                    </span>
                                </div>
                            </div>
                            <div className="itinerary-description">
                                <h3>Description</h3>
                                <p>
                                    {itinerary.description}
                                </p>
                            </div>
                        </div>
                    </Link>
                    <div className="button-container">
                        <div className="delete-button" onClick={() => deleteItinerary(itinerary._id)}>

                        </div>
                        <div className="edit-button">

                        </div>
                        {/* <button onClick={() => deleteItinerary(itinerary._id)}>Delete</button> */}
                    </div>
                </div>
            {/* </Link> */}
        </div>
    );
}

export default ItineraryItem