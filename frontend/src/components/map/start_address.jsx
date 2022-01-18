import React from "react";
import Map from './map';
import MarkerManager from "./marker_manager";


class StartAddress extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {location: ''}
        this.onPlaceChanged = this.onPlaceChanged.bind(this); 
    }

    componentDidMount() {
        this.map = new Map(this.mapNode); 
        this.MarkerManager = new MarkerManager(this.map)
        this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {
            componentRestrictions: { 'country': ['US'] },
            fields: ['place_id', 'geometry', 'name', 'address_components']
        })
        const autocomplete = this.autocomplete;
        autocomplete.addListener('place_changed', this.onPlaceChanged)
    }

    onPlaceChanged() {
        const place = this.autocomplete.getPlace();
        if (!place.geometry) {
            document.getElementById('autocomplete').placeholder = "Enter your address"
        }
        else {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();

            this.MarkerManager.addMarker({lat: lat, lng: lng})

            const address = { address: `${place.address_components[0].short_name} ${place.address_components[1].short_name}`, city: place.address_components[3].long_name, state: place.address_components[5].short_name, country: place.address_components[6].short_name, zipCode: place.address_components[7].short_name, lat: lat, lng: lng }
            this.setState({ location: address })
        }
    }

    render () {
        return (
            <div>
                <div className="address-input">
                    <input id="autocomplete" placeholder='Enter your address' type="text" />
                </div>
                <div className="map-container-test" style={{ width: "80vw", height: "80vh" }}>
                    <div className="map" ref={map => this.mapNode = map} style={{ width: "100%", height: "100%" }}></div>
                </div>

            </div>
        )

    }
}

export default StartAddress; 