import React from "react";
import Map from './map';
import MarkerManager from "./marker_manager";
import { Link } from "react-router-dom";
import '../../assets/css/map.scss';
const google = window.google;
class EnterAddress extends React.Component {

    constructor(props) {
        super(props); 
        this.state = { location: '', id: ''}
        this.onPlaceChanged = this.onPlaceChanged.bind(this); 
        this.handleSubmitItinerary = this.handleSubmitItinerary.bind(this); 
    }

    componentDidMount() {
        this.map = new Map(this.mapNode); 
        this.map.instantiateMap(); 
        this.MarkerManager = new MarkerManager(this.map)
        if (this.props.startAddress) {
            debugger 
            this.MarkerManager.addMarker({ lat: this.props.startAddress.lat, lng: this.props.startAddress.lng})
        }
        this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {
            componentRestrictions: { 'country': ['US'] },
            fields: ['place_id', 'geometry', 'name', 'formatted_address']
        })
        const autocomplete = this.autocomplete;
        autocomplete.addListener('place_changed', this.onPlaceChanged)

        if (this.props.match.params.id === '1') {
            this.props.receiveStartingAddress({ address: this.props.currentUser.address, lat: this.props.currentUser.address_coord.coordinates[1], lng: this.props.currentUser.address_coord.coordinates[0] })
            debugger 
            this.MarkerManager.addMarker({ lat: this.props.currentUser.address_coord.coordinates[1], lng: this.props.currentUser.address_coord.coordinates[0]}, {
                url: 'https://cdn-icons.flaticon.com/png/512/550/premium/550907.png?token=exp=1642621415~hmac=4d71282433f291f628c8da9d4b7508b6', scaledSize: new google.maps.Size(30, 30)
            })
        } 
        
    }


    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
           const autocomplete = document.getElementById('autocomplete')
           autocomplete.value = ''; 
        }
    }

    onPlaceChanged() {
        const place = this.autocomplete.getPlace();
        if (!place.geometry) {
            document.getElementById('autocomplete').placeholder = 'Enter an address'
        }
        else {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();

            
            const address = {address: place.formatted_address, lat: lat, lng: lng}

            if (this.props.match.params.id === '1') {
                if (this.props.startAddress) {
                    this.MarkerManager.removeMarker(this.props.startAddress.lat)
                }
                this.props.receiveStartingAddress(address)
                // save address into itinerary as well 
            }
            else if (this.props.match.params.id === '2') {
                if (this.props.endAddress) {
                    this.MarkerManager.removeMarker(this.props.endAddress.lat)
                }
                this.props.receiveEndAddress(address)
                //save address into itinerary as well 
            }

            if (this.props.match.params.id === '1')  {
                this.MarkerManager.addMarker({ lat: lat, lng: lng }, {
                    url: 'https://cdn-icons.flaticon.com/png/512/550/premium/550907.png?token=exp=1642621415~hmac=4d71282433f291f628c8da9d4b7508b6', scaledSize: new google.maps.Size(30, 30)})
            }
            else {
                this.MarkerManager.addMarker({ lat: lat, lng: lng }, {
                    url: 'https://cdn-icons-png.flaticon.com/512/2906/2906719.png', scaledSize: new google.maps.Size(30, 30)
                })
            }
            
        }
    }

    handleSubmitItinerary() {
        const itinerary = {user: this.props.currentUser.id, title: this.props.title, description: this.props.description, start_address: this.props.startAddress.address, end_address: this.props.endAddress.address, start_lat: this.props.startAddress.lat.toString(), start_lng: this.props.startAddress.lng.toString(), end_lat: this.props.endAddress.lat.toString(), end_lng: this.props.endAddress.lng.toString()};  
        this.props.createItinerary(itinerary).then(response => 
        {
                    // this.props.clearItineraryForm();
                    this.setState({id: response.itinerary.data._id}) 
                    this.props.history.push(`/itinerary/${this.state.id}/draw`)
        })

    }

    render() {
        if (this.props.match.params.id !== '1' && this.props.match.params.id !== '2') {
            return null; 
        }

        return (
        <div style={{height: "100vh", width: "100vw"}} className="starting-map">
            <div className="question">{this.props.match.params.id === '1' ? 'Where are you starting?' :  'Where are you going?'}</div>
            <div className="address-input">
                <input id="autocomplete" placeholder="Enter an address" type="text" className="address-input" defaultValue={this.props.match.params.id === '1' ? this.props.currentUser.address : null }/>
            </div>
            <div className="map-container">
                    <div className="map" ref={map => this.mapNode = map}></div>
            </div>
            <div>
                <div className="next-container">
                    { this.props.match.params.id === '2' ? <Link to="/map/1" className="back-button">Back</Link> : null}
                  {this.props.match.params.id === '1' ? <Link to="/map/2" className="next-button">Next</Link> : <button to="/map/draw" className="next-button" onClick={this.handleSubmitItinerary}>Next</button>} 
                </div>
            </div>
        </div>
            
        )
    }
}

export default EnterAddress; 