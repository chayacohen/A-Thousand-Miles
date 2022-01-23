import React from "react";
import ItineraryItemContainer from "./itinerary_item_container";
import '../../assets/css/itinerary.scss';
class Itinerary extends React.Component{

    constructor(props){
        super(props);
        this.checkItinerary = this.checkItinerary.bind(this)
    }


    checkItinerary(){
        const itineraryitems = this.props.itineraries.map(itinerary => {
            return (
                <li key={itinerary._id}>
                    <ItineraryItemContainer itinerary={itinerary} />
                </li>
            )
        })

        if (this.props.itineraries.length === 0) {
            return (
                <div className="add-itinerary-text">
                    <span>Click on Trip Planner to get started!</span>
                </div>
            )
        } else {
            return (
                <div className="itinerary-inner-container">
                    <ul>
                        {itineraryitems}
                    </ul>
                </div>
            )
        }
    }

    render(){
        // const itineraryitems = this.props.itineraries.map(itinerary => {
        //     return (
        //         <li key={itinerary._id}>
        //             <ItineraryItemContainer itinerary={itinerary}/>
        //         </li>
        //     )
        // })

        const itinerary = this.checkItinerary()
        return(
            <div className="itinerary-container">
                {itinerary}
            </div>
        )
    }
}

export default Itinerary;