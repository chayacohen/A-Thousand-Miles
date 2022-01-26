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
        this.state = { location: '', id: '', address: ''}
        this.onPlaceChanged = this.onPlaceChanged.bind(this); 
        this.handleEditStart = this.handleEditStart.bind(this); 
    }

    componentDidMount() {
        this.map = new Map(this.mapNode); 
        this.map.instantiateMap(); 
        this.map.map.setOptions({ draggable: true });
        this.MarkerManager = new MarkerManager(this.map); 

        this.props.getItinerary(this.props.match.params.itineraryId).then(itinerary => {
             const itineraryInfo = itinerary.itinerary.data; 
             if(itineraryInfo.start_address) {
                 this.setState({address: {address: itineraryInfo.start_address, lat: itineraryInfo.start_lat, lng: itineraryInfo.start_lng}})
                 this.MarkerManager.addMarker({ lat: itineraryInfo.start_lat, lng: itineraryInfo.start_lng }, {
                     url: 'https://cdn-icons-png.flaticon.com/512/25/25694.png', scaledSize: new google.maps.Size(30, 30)
                 })
             }
             else {
                 const address = { address: this.props.currentUser.address, lat: this.props.currentUser.address_coord.coordinates[1], lng: this.props.currentUser.address_coord.coordinates[0] }
                this.setState({ address: address })
                this.props.editItinerary(this.props.match.params.itineraryId, { start_address: address.address, start_lat: address.lat, start_lng: address.lng }); 
                 this.MarkerManager.addMarker({ lat: address.lat, lng: address.lng }, {
                     url: 'https://cdn-icons-png.flaticon.com/512/25/25694.png', scaledSize: new google.maps.Size(30, 30)
                 })
             }
             if(itineraryInfo.end_address) {
                 this.MarkerManager.addMarker({ lat: itineraryInfo.end_lat, lng: itineraryInfo.end_lng }, {
                     url: 'https://cdn-icons-png.flaticon.com/512/1072/1072569.png', scaledSize: new google.maps.Size(30, 30)
                 })
             }
        })
     
        this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {
            componentRestrictions: { 'country': ['US'] },
            fields: ['place_id', 'geometry', 'name', 'formatted_address']
        })
        const autocomplete = this.autocomplete;
        autocomplete.addListener('place_changed', this.onPlaceChanged)
        
    }


    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
           const autocomplete = document.getElementById('autocomplete')
           if (this.props.match.params.id === '1') {
               autocomplete.value = this.props.itinerary.start_address; 
           }
           else if (this.props.match.params.id === '2') {
               autocomplete.value = this.props.itinerary.end_address; 
           }
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
                if (this.props.itinerary.start_address) {
                    this.MarkerManager.removeMarker(this.props.itinerary.start_lat)
                }
                this.setState({address: address}); 
                this.props.editItinerary(this.props.itinerary._id, {start_address: address.address, start_lat: lat, start_lng: lng})
                // save address into itinerary as well 
            }
            else if (this.props.match.params.id === '2') {
                if (this.props.itinerary.end_address) {
                    this.MarkerManager.removeMarker(this.props.itinerary.end_lat)
                }
                this.setState({address: address})
                this.props.editItinerary(this.props.itinerary._id, { end_address: address.address, end_lat: lat, end_lng: lng })
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

    handleEditStart() {
        this.setState({address: ''})
    }

    render() {

        let autocompleteDefault = null; 
        if (this.props.match.params.id === '1') {
            if (this.props.itinerary && this.props.itinerary.start_address) {
                autocompleteDefault = this.props.itinerary.start_address 
            }
        }

        if (this.props.match.params.id === '2') {
            if (this.props.itinerary) {
                autocompleteDefault = this.props.itinerary.end_address
            }
        }

        if (this.props.match.params.id !== '1' && this.props.match.params.id !== '2') {
            return null; 
        }

        return (
        <div className="map-start-container">
            <div className="controls-container">
                <div className="back-container">
                        {this.props.match.params.id === '2' ? <Link to={`/itinerary/${this.props.match.params.itineraryId}/map/1`} className="back-button-2">{'<'}</Link> : <a className="back-button-3">{'<'}</a>}
                </div>

                <div className="questions-box">
                    <div className="questions">{this.props.match.params.id === '1' ? 'Where are you starting?' : 'Where do you want to go?'}</div>
                    <div className="address-fields">
                        <input id="autocomplete" placeholder="Enter an address" type="text" className="address-input" defaultValue={autocompleteDefault}/>
                    </div>
                </div>

                <div className="next-container">
                        {this.props.match.params.id === '1' ? <Link to={`/itinerary/${this.props.match.params.itineraryId}/map/2`} className="next-button-2" onClick={this.handleEditStart}>{'>'}</Link> : <Link to={`/itinerary/${this.props.match.params.itineraryId}/draw`} className="next-button-3">{'>'}</Link>} 
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