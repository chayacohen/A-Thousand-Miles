import React from "react";
import Map from './map';
import MarkerManager from "./marker_manager";
import { Link } from "react-router-dom";
// import '../../assets/css/map.scss';
import '../../assets/css/enteraddress.scss';
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
            this.MarkerManager.addMarker({ lat: this.props.startAddress.lat, lng: this.props.startAddress.lng }, {
                url: 'https://cdn-icons-png.flaticon.com/512/25/25694.png', scaledSize: new google.maps.Size(30, 30)
            } )
        }
        this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {
            componentRestrictions: { 'country': ['US'] },
            fields: ['place_id', 'geometry', 'name', 'formatted_address']
        })
        const autocomplete = this.autocomplete;
        autocomplete.addListener('place_changed', this.onPlaceChanged)

        if (this.props.match.params.id === '1') {
            this.props.receiveStartingAddress({ address: this.props.currentUser.address, lat: this.props.currentUser.address_coord.coordinates[1], lng: this.props.currentUser.address_coord.coordinates[0] })
            this.MarkerManager.addMarker({ lat: this.props.currentUser.address_coord.coordinates[1], lng: this.props.currentUser.address_coord.coordinates[0] }, {
                url: 'https://cdn-icons-png.flaticon.com/512/25/25694.png', scaledSize: new google.maps.Size(30, 30)
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
                    url: 'https://cdn-icons-png.flaticon.com/512/25/25694.png', scaledSize: new google.maps.Size(30, 30)})
            }
            else {
                this.MarkerManager.addMarker({ lat: lat, lng: lng }, {
                    url: 'https://cdn-icons-png.flaticon.com/512/1072/1072569.png', scaledSize: new google.maps.Size(30, 30)
                })
            }
            
        }
    }

    handleSubmitItinerary() {
        const itinerary = {user: this.props.currentUser.id, title: this.props.title, description: this.props.description, start_address: this.props.startAddress.address, end_address: this.props.endAddress.address, start_lat: this.props.startAddress.lat.toString(), start_lng: this.props.startAddress.lng.toString(), end_lat: this.props.endAddress.lat.toString(), end_lng: this.props.endAddress.lng.toString()};  
        debugger
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
        <div className="map-start-container">
            <div className="controls-container">
                <div className="back-container">
                    { this.props.match.params.id === '2' ? <Link to="/map/1" className="back-button-2">{'<'}</Link> : <a className="back-button-2">{'<'}</a>}
                </div>

                <div className="questions-box">
                    <div className="questions">{this.props.match.params.id === '1' ? 'Where are you starting?' : 'Where do you want to go?'}</div>
                    <div className="address-fields">
                        <input id="autocomplete" placeholder="Enter an address" type="text" className="address-input" defaultValue={this.props.match.params.id === '1' ? this.props.currentUser.address : null }/>
                    </div>
                </div>

                <div className="next-container">
                    {this.props.match.params.id === '1' ? <Link to="/map/2" className="next-button-2">{'>'}</Link> : <a to="/map/draw" className="next-button-3" onClick={this.handleSubmitItinerary}>{'>'}</a>} 
                </div>
            </div>
           
            <div className="map-container">
                    <div className="map_enter" ref={map => this.mapNode = map}></div>
            </div>
        </div>
            
        )
    }
}

export default EnterAddress; 