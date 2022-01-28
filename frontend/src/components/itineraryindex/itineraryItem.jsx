import React from "react"
import { Link } from "react-router-dom";
import deleteIcon from '../../assets/images/delete.png';
import pencilIcon from '../../assets/images/pencil.png'
import mapImg from '../../assets/images/map-temp.png'
const ItineraryItem = ({ itinerary, deleteItinerary, editItinerary, history }) => {

    const sendToEdit = () => {
        history.push(`/itinerary/${itinerary._id}/edit`)
    }
    return(
        <div className="itinerary-item-container">
                <div className="itinerary-item">
                    <Link to={`/profile/${itinerary._id}`} className="link-container">
                        <div className="map-temp">
                            <img alt="map" src={mapImg} />
                        </div>
                    </Link>
                    <div className="card-container">
                        <Link to={`/profile/${itinerary._id}`} className="link-container">
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
                                <img alt="delete" src={deleteIcon} />
                            </div>
                            <div className="edit-button" onClick={sendToEdit}>
                                <img alt="edit" src={pencilIcon}/>
                            </div>
                        <Link to={`/profile/${itinerary._id}`} className="empty"></Link>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default ItineraryItem