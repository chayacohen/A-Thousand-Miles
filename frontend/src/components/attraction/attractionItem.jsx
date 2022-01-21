import React from "react"
import deleteIcon from '../../assets/images/delete.png';
import star from '../../assets/images/star.png'
const AttractionItem = ({ attraction, deleteAttraction }) => {
    // debugger;

    const address = () => {
        if (!attraction.address){
            return <p>N/A</p>
        } else {
            return <p>{attraction.address}</p>
        }
    }

    const googleLink = () => {
        if (!attraction.googleMapLink) {
            return <p>N/A</p>
        } else {
            return <a href={attraction.googleMapLink} target="_blank">{attraction.title}</a>
        }
    }

    return (
        <div className="attraction-item-container">
            <div className="attraction-item">
                <div className="photo-temp">
                    <img src={attraction.photoUrl}/>
                </div>
                <div className="attraction-item-content-container">
                    <div className="attraction-title">
                        <h1>{attraction.title}</h1>
                    </div>
                    <div className="attraction-rating">
                        <span>Rating: <img alt="star" src={star} /> {attraction.rating}</span>
                    </div>
                    <div className="attraction-address">
                        <span>Address:</span>
                        {address()}
                    </div>
                    <div className="attraction-googlelink">
                        <span>Link to:</span>
                        {googleLink()}
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