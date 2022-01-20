import React from "react";
import ItineraryAttractionItem from "./itinerary_attraction_item";


class ItineraryAttractionIndex extends React.Component {

    constructor(props) {
        super(props); 
        // this.state = {attractions: this.props.attractions}
    }

    // componentDidUpdate(prevState) {
    //     if (prevState.attractions !== this.state.attractions){

    //     }
    // }

    render() {

        if (!this.props.attractions) {
            return null
        }


        return (
            <ul>
                {this.props.attractions.map((attraction, index) => (
                    <div>
                        <ItineraryAttractionItem key={index} attraction={attraction} editAttraction={this.props.editAttraction} itineraryId={this.props.itineraryId} />
                    </div>
                ))}
            </ul>
        )
    }
}

export default ItineraryAttractionIndex; 