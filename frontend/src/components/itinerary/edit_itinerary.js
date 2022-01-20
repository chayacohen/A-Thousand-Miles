import React from "react";
import Map from "../map/map";
const KEYS = require('../../keys')


class EditItinerary extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {itineraryAttractions: []}
    }

    componentDidMount() {
        this.addGoogleMapScript(); 
        this.props.getItinerary(this.props.match.params.id); 
        this.itineraryAttractions = '';
        this.props.getItineraryAttractions(this.props.match.params.id).then(response => {
            this.setState({ itineraryAttractions: response.attractions.data}) 
        })
        this.map = new Map(this.mapNode)
        this.map.instantiateMap();
    }

    // we have to find a way to store all attractions, unless we refetch based on the same algorithm. Possibly we can make an attribute of attraction a boolean of true or false and then based on if true, it is part of itinerary. Or keep two seperate attraction types?
    
    
    addGoogleMapScript() {
        const head = document.head
        const googleMapScript = document.querySelector('.google');
        if (!googleMapScript || googleMapScript.src !== `https://maps.googleapis.com/maps/api/js?key=${KEYS.googleAPI}&libraries=places,drawing`) {
            const googleScript = document.createElement('script')
            googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${KEYS.googleAPI}&libraries=places,drawing`;
            googleScript.className = "google";
            head.appendChild(googleScript);
        }
    }

    render () {
        debugger 

        const map = <div className="map" ref={map => this.mapNode = map} ></div>


        if (!this.state.itineraryAttractions) {
            return null
        }

        return (
            <div>
                <div className="edit-map-container" style={{width: '300px', height:'300px'}}>
                    {map}
                </div>
                <ul>
                    {this.state.itineraryAttractions.map((attraction, index) => (
                        <li key={index}>
                            {attraction.title}
                        </li>
                    ))}
                </ul>
            </div> 
        )
    }


}

export default EditItinerary;