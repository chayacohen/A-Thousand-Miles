import React from "react"
import deleteIcon from '../../assets/images/delete.png';
import star from '../../assets/images/star.png'
const AttractionItem = ({ attraction, deleteAttraction }) => {
    // debugger;
    return (
        <div className="attraction-item-container">
            <div className="attraction-item">
                <div className="photo-temp">

                </div>
                <div className="attraction-item-content-container">
                    <div className="attraction-title">
                        <h1>{attraction.title}</h1>
                    </div>
                    <div className="attraction-rating">
                        <span>Rating: <img alt="star" src={star} /> {attraction.rating}</span>
                    </div>
                    <div className="attraction-address">
                        <span>Address: N/A</span>
                    </div>
                </div>
                <div className="attraction-delete-button">
                    <div className="delete-button-a" onClick={() => deleteAttraction(attraction._id)}>
                        <img alt="delete" src={deleteIcon} />    
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AttractionItem