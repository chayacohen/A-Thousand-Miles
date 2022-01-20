import React from "react";
import ItineraryItemContainer from "./itinerary_item_container";
import '../../assets/css/itinerary.scss';
class Itinerary extends React.Component{

    render(){
        const itineraryitems = this.props.itineraries.map(itinerary => {
            return (
                <li key={itinerary._id}>
                    <ItineraryItemContainer itinerary={itinerary}/>
                </li>
            )
        })
        return(
            <div className="itinerary-container">
                <div className="itinerary-inner-container">
                    <ul>
                        {itineraryitems}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Itinerary;