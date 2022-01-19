import React from "react";
import ItineraryItemContainer from "./itinerary_item_container";
class Itinerary extends React.Component{

    render(){
        const itineraryitems = this.props.itineraries.map(itinerary => {
            return (
                <li>
                    <ItineraryItemContainer itinerary={itinerary}/>
                </li>
            )
        })
        return(
            <div>
                itinerary
                <ul>
                    {itineraryitems}
                </ul>
            </div>
        )
    }
}

export default Itinerary;