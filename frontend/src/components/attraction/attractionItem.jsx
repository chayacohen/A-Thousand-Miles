import React from "react"
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
                        <span>Rating: {attraction.rating}</span>
                    </div>
                </div>
                <div className="attraction-delete-button">
                    <button onClick={() => deleteAttraction(attraction._id)}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default AttractionItem