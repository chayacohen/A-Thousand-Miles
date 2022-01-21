import React from "react";
import ItineraryAttractionItem from "./itinerary_attraction_item";
import '../../assets/css/draw_attraction_item.scss'

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
            <div className="draw-attraction-item">
                {this.props.attractions.map((attraction, index) => (
                    <div className="draw-item">
                        <ItineraryAttractionItem key={index} attraction={attraction} editAttraction={this.props.editAttraction} itineraryId={this.props.itineraryId} />
                    </div>
                ))}
            </div>
        )
    }
}

export default ItineraryAttractionIndex; 