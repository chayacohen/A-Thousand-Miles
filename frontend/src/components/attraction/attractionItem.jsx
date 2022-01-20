import React from "react"
const AttractionItem = ({ attraction, deleteAttraction }) => {
    // debugger;
    return (
        <div>
            {attraction.title}, {attraction.rating}
            <button onClick={() => deleteAttraction(attraction._id)}>Delete</button>
        </div>
    );
}

export default AttractionItem