import React from "react";
import Map from './map';
import MarkerManager from "./marker_manager";
const KEYS = require('../../keys')

class DrawMapRoute extends React.Component {
    constructor(props) {
        super(props)
        this.state = { itineraryResults: [], 
            totalResults: [], 
            mapName: 'draw-map-container', 
            title: '', 
            lat: '',
            lng: '',
            photoUrl: '', 
            attractionAddress: '', 
            rating: '',
            placeId: '', 
            googleLink: ''
        }
        this.clicked = false;
        this.round = true;
        this.start_pos = new google.maps.LatLng(this.props.startAddress.lat, this.props.startAddress.lng)
        this.end_pos = new google.maps.LatLng(this.props.endAddress.lat, this.props.endAddress.lng)
        this.addLatLng = this.addLatLng.bind(this);
        this.receiveResults = this.receiveResults.bind(this);

    }

    componentDidMount() {
        this.map = new Map(this.mapNode)
        this.map.instantiateMap();
        this.map.map.setZoom(4.7)
        this.map.map.addListener("mousedown", (e) => {
            this.clicked = !this.clicked
        });

        this.drawListener = this.map.map.addListener("mousemove", e => {
            if (e.domEvent.type === "mouseup") {
                console.log("mouseup")
            }
            if (this.clicked && this.round) {
                this.addLatLng(e)
            }
        })

        this.map.poly.addListener("mouseup", (e) => {
            if (this.clicked) {
                this.clicked = false;
                this.round = false;
                this.drawListener.remove();
                
                this.path = this.map.poly.getPath().xd 
                this.map.poly.getPath().insertAt(0,this.start_pos); 
                this.map.poly.getPath().insertAt((this.path.length - 1), this.end_pos); 
                this.path = this.map.poly.getPath().xd 
                this.receiveResults().then(() => {
                    debugger 
                    let increment = Math.floor(this.state.totalResults.length / 15)
                    if (increment === 0) {
                        increment = 1
                    }
                    for (let i = 0; i < this.state.totalResults.length; i += increment) {
                        const result = this.state.totalResults[i];
                        this.state.itineraryResults.push(result);  
                        this.service.getDetails({placeId: result.place_id}, (response, status) => {
                            if (status === google.maps.places.PlacesServiceStatus.OK) {
                                this.setState({attractionAddress: response.formatted_address}) 
                            }
                        })
                        this.markerManager.addMarker({ lat: result.geometry.location.lat(), lng: result.geometry.location.lng() }, { url: result.icon, scaledSize: new google.maps.Size(20, 20)})
                        this.setState({ 
                            title: result.name, 
                            location: [result.geometry.location.lng(), result.geometry.location.lat()], 
                            photoUrl: result.photos ? result.photos[0].getUrl() : null , 
                            rating: result.rating, 
                            placeId: result.place_id, 
                            googleLink: `https://www.google.com/maps/place/?q=place_id:${result.place_id}`
                        })
                    }
                })
                this.setState({mapName: 'after-draw-map-container'})
            }
        })
        this.markerManager = new MarkerManager(this.map)
        this.markerManager.addMarker(this.start_pos, {
            url: 'https://cdn-icons.flaticon.com/png/512/550/premium/550907.png?token=exp=1642621415~hmac=4d71282433f291f628c8da9d4b7508b6', scaledSize: new google.maps.Size(40, 40)
        })
        this.markerManager.addMarker(this.end_pos, {
            url: 'https://cdn-icons-png.flaticon.com/512/2906/2906719.png', scaledSize: new google.maps.Size(40, 40)
        })
    }

    addLatLng(e) {
        if (this.clicked && this.round) {
            const path = this.map.poly.getPath();
            path.push(e.latLng)
        }
    }

    receiveResults() {
        const promises = [];
        this.service = new google.maps.places.PlacesService(this.map.map);
        const increment = Math.floor(this.path.length / 15)
        for (let i = 1; i < this.path.length; i += (increment > 0 ? increment : 1)) {
            if (this.path[i])
                promises.push(new Promise((resolve, reject) => {
                    this.service.nearbySearch({
                        location: { lat: this.path[i].lat(), lng: this.path[i].lng() },
                        radius: 50000,
                        type: ['tourist_attraction'],
                    }, (results, status) => {
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                            this.setState({ totalResults: this.state.totalResults.concat(results) })
                            resolve()
                        }
                        else if (status) {
                            resolve();
                        }
                    })
                }))
        }
        return Promise.all(promises)
    }


    render() {
        return (
            <div className={this.state.mapName} >
                <div className="map" ref={map => this.mapNode = map} ></div>
            </div>
        )
    }
}


export default DrawMapRoute; 