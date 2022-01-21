import React from "react";
import Map from './map';
import MarkerManager from "./marker_manager";
import ItineraryAttractionItem from "../itinerary/itinerary_attraction_item";
import ItineraryAttractionIndex from "../itinerary/itinerary_attraction_index";
const google = window.google;
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
            googleLink: '', 
            attractions: []
        }
        this.clicked = false;
        this.round = true;
        this.start_pos = new google.maps.LatLng(this.props.startAddress.lat, this.props.startAddress.lng)
        this.end_pos = new google.maps.LatLng(this.props.endAddress.lat, this.props.endAddress.lng)
        this.addLatLng = this.addLatLng.bind(this);
        this.receiveResults = this.receiveResults.bind(this);
        this.convertPath = this.convertPath.bind(this);
        // this.handleAttractionClick = this.handleAttractionClick.bind(this);  

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
                // console.log("mouseup")
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
                this.pathForDB = this.convertPath(); 
                this.props.editItinerary(this.props.match.params.id, {line: this.pathForDB} )
                
                this.receiveResults().then(() => { 
                    let increment = Math.floor(this.state.totalResults.length / 15)
                    if (increment === 0) {
                        increment = 1
                    }
                    debugger 
                    for (let i = 0; i < this.state.totalResults.length; i += increment) {
                        const result = this.state.totalResults[i];
                        this.setState({itineraryResults: this.state.itineraryResults.concat([result])});
                        this.markerManager.addMarker({ lat: result.geometry.location.lat(), lng: result.geometry.location.lng() }, { url: result.icon, scaledSize: new google.maps.Size(20, 20)})
                            const resultInfo = {
                                title: result.name,
                                lat: result.geometry.location.lat().toString(),
                                lng: result.geometry.location.lng().toString(),
                                photoUrl: result.photos ? result.photos[0].getUrl() : null,
                                rating: result.rating ? result.rating.toString() : 'none',
                                placeId: result.place_id,
                                googleLink: `https://www.google.com/maps/place/?q=place_id:${result.place_id}`, 
                                icon: result.icon,
                                address: this.state.attractionAddress
                            }
                            this.setState(resultInfo)
                            this.props.createAttraction(this.props.match.params.id, resultInfo)
                    }

                    this.props.getItineraryAttractions(this.props.match.params.id, false).then(response => {
                        this.setState({ attractions: response.attractions.data })
                        this.state.attractions.forEach(attraction => {
                            debugger 
                            this.service.getDetails({ placeId: attraction.placeId }, (response, status) => {
                                debugger 
                                if (status === google.maps.places.PlacesServiceStatus.OK) {
                                    this.setState({ attractionAddress: response.formatted_address })
                                    this.props.editAttraction(attraction._id, {address: this.state.attractionAddress})
                                    debugger
                                }
                            })
                        })
                    })
                  
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

    getAddress(result) {
        return new Promise((resolve, reject) => {
            this.service.getDetails({ placeId: result.placeId }, (response, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                this.setState({ attractionAddress: response.formatted_address })
                resolve(); 
            }
            else {
                reject(); 
            }
        })  })
    }

    convertPath() {
        const path = []; 
        this.path.forEach(location => {
            const lat = location.lat().toString(); 
            const lng = location.lng().toString(); 
            path.push({lat: lat, lng: lng})
        })
        return path; 
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
        // this.state.itineraryResults.forEach(result => console.log(result)); 
        return (
            <div>
                <div className={this.state.mapName} >
                    <div className="map" ref={map => this.mapNode = map} ></div>
                </div>
                <div className="attraction-index">
                    <ItineraryAttractionIndex itineraryId={this.props.match.params.id} editAttraction={this.props.editAttraction} attractions={this.state.attractions} />
                </div>
            </div>
        )
     }
}



export default DrawMapRoute; 