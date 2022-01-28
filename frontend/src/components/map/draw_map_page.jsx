import React from "react";
import Map from './map';
import MarkerManager from "./marker_manager";
import '../../assets/css/draw_map.scss'
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
            googleMapLink: '', 
            attractions: [], 
            start_pos: '',
            end_pos: '', 
            draggable: true, 
            save: false
        }
        this.clicked = false;
        this.round = true;
     
       
        this.addLatLng = this.addLatLng.bind(this);
        this.receiveResults = this.receiveResults.bind(this);
        this.convertPath = this.convertPath.bind(this);
        this.getAddress = this.getAddress.bind(this); 
        this.handleSaveClick = this.handleSaveClick.bind(this); 
        this.handleResetLine = this.handleResetLine.bind(this);
        this.addMapListeners = this.addMapListeners.bind(this);
        this.handleMapBounds = this.handleMapBounds.bind(this); 
        this.handleDragClick = this.handleDragClick.bind(this);
        this.handleDrawClick = this.handleDrawClick.bind(this); 
    }

    componentDidMount() {
        this.map = new Map(this.mapNode)
        this.map.instantiateMap();
        this.map.map.setOptions({ draggable: true });
        // this.map.map.setZoom(4.7)
        this.markerManager = new MarkerManager(this.map); 
        this.props.getItinerary(this.props.match.params.id).then(response => { 
            this.setState({ start_pos: new google.maps.LatLng(response.itinerary.data.start_lat, response.itinerary.data.start_lng), end_pos: new google.maps.LatLng(response.itinerary.data.end_lat, response.itinerary.data.end_lng)}) 
            this.markerManager.addMarker(this.state.start_pos, {
                url: 'https://cdn-icons-png.flaticon.com/512/25/25694.png', scaledSize: new google.maps.Size(40, 40)
            })
            this.markerManager.addMarker(this.state.end_pos, {
                url: 'https://cdn-icons-png.flaticon.com/512/1072/1072569.png', scaledSize: new google.maps.Size(40, 40)
            })
            this.handleMapBounds() 
        
        })
    }

    handleMapBounds() {
        const bounds = new google.maps.LatLngBounds();
        const markers = Object.values(this.markerManager.markers);
        debugger 
        markers.forEach(marker => {
            bounds.extend(marker.position)
        });
        this.map.map.fitBounds(bounds);
    }

    getAddress(attractions) {
        const promises = []; 
        attractions.forEach(attraction => {
            promises.push(new Promise((resolve, reject) => {
               this.service.getDetails({ placeId: attraction.placeId }, (response, status) => {
               if (status === google.maps.places.PlacesServiceStatus.OK) {
                   this.setState({ attractionAddress: response.formatted_address })
                   this.props.editAttraction(attraction._id, {address: this.state.attractionAddress}).then(() => {
                       resolve(); 
                   })
               }
               else {
                   resolve(); 
               }
           })  
        }))
        })
        return Promise.all(promises)
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

    addMapListeners() {
        this.map.map.addListener("mousedown", (e) => {
            this.clicked = !this.clicked
        });

        this.drawListener = this.map.map.addListener("mousemove", e => {
            if (this.clicked && this.round) {
                this.addLatLng(e)
            }
        }); 

        this.map.poly.addListener("mouseup", (e) => {
            if (this.clicked) {
                this.clicked = false;
                this.round = false;

                this.path = this.map.poly.getPath().xd
                this.map.poly.getPath().insertAt(0, this.state.start_pos);
                this.map.poly.getPath().insertAt((this.path.length - 1), this.state.end_pos);
                this.path = this.map.poly.getPath().xd
                this.setState({save: true}); 
            }
        });
    }

    handleSaveClick() {

        this.pathForDB = this.convertPath();
        this.props.editItinerary(this.props.match.params.id, { line: this.pathForDB, complete: true })

        this.receiveResults().then(() => {
            this.drawListener.remove();

            let increment = Math.floor(this.state.totalResults.length / 15)
            if (increment === 0) {
                increment = 1
            }
            for (let i = 0; i < this.state.totalResults.length; i += increment) {
                const result = this.state.totalResults[i];
                this.setState({ itineraryResults: this.state.itineraryResults.concat([result]) });
                this.markerManager.addMarker({ lat: result.geometry.location.lat(), lng: result.geometry.location.lng() }, { url: result.icon, scaledSize: new google.maps.Size(20, 20) })
                const resultInfo = {
                    title: result.name,
                    lat: result.geometry.location.lat().toString(),
                    lng: result.geometry.location.lng().toString(),
                    photoUrl: result.photos ? result.photos[0].getUrl() : null,
                    rating: result.rating ? result.rating.toString() : 'none',
                    placeId: result.place_id,
                    googleMapLink: `https://www.google.com/maps/place/?q=place_id:${result.place_id}`,
                    icon: result.icon,
                    address: this.state.attractionAddress
                }
                this.setState(resultInfo)
                this.props.createAttraction(this.props.match.params.id, resultInfo)
                this.handleMapBounds();
            }

            this.props.getItineraryAttractions(this.props.match.params.id, false).then(response => {
                this.setState({ attractions: response.attractions.data })
                this.getAddress(this.state.attractions).then(() => {
                    this.props.getItineraryAttractions(this.props.match.params.id, false).then(response => {
                        this.setState({ attractions: response.attractions.data })
                    })
                })
            })

        })

        this.map.map.setOptions({ draggable: true });
        this.setState({ mapName: 'after-draw-map-container' })  
    }; 

    handleResetLine() {
        this.map.poly.setPath([]); 
        this.round = true;
        this.props.getItineraryAttractions(this.props.itinerary._id).then(attractions => {
            if (attractions.attractions.data.length > 0 ) {
                attractions.attractions.data.forEach(attraction => {
                    this.props.deleteAttraction(attraction._id);
                })
            } 
            this.setState({ mapName: 'draw-map-container', attractions: []}); 
        }); 
        this.setState({save: false})
    }

    handleDrawClick() {
        this.map.map.setOptions({ draggable: false });
        this.addMapListeners(); 
        this.setState({draggable: false})
    }

    handleDragClick() {
        this.map.map.setOptions({ draggable: true });
        this.drawListener.remove(); 
        this.setState({draggable: true}); 
    }

    render() {

        const draggable = this.state.draggable; 
        const save = this.state.save; 

        const draw = this.state.mapName === "draw-map-container";
        const itinerary = this.props.itinerary; 
        return (
            <div className="draw-map">
                <div className={draw ? null : "map-and-attractions"}>
                    <div className={draw ? "draw" : "left-page"}>
                        { draw ? null : <div>
                            <h1 className="draw-title">{itinerary ? this.props.itinerary.title : null }</h1>
                            <p className="draw-description">{itinerary ? this.props.itinerary.description : null}</p>
                        </div>}
                        {draw ? 
                        <div className="drag-draw">
                                <button onClick={this.handleDragClick} id = {draggable === true ? "non-active" : null }>DRAG</button>
                                <button onClick={this.handleDrawClick} id={draggable !== true ? "non-active" : null}>DRAW</button>
                        </div> : null }
                        <div className={this.state.mapName} >
                                {draw ? <h1 className="h-draw">Draw a line from start to end </h1> : null }
                                <div className="map" id={draw ? "draw-map" : "done-draw-map"} ref={map => this.mapNode = map} ></div>
                        </div>
                         {draw ?
                            <div className="draw-map-buttons">
                                <button onClick={this.handleResetLine}>RESET</button>
                                <button onClick={this.handleSaveClick} id={save === false ? "non-active" : null}>SAVE</button>
                            </div>
                                : null}
                    
                    </div>
                    {this.state.attractions.length === 0 ? null : 
                    <div className="attraction-index">
                        <ItineraryAttractionIndex itineraryId={this.props.match.params.id} editAttraction={this.props.editAttraction} attractions={this.state.attractions} getAttraction={this.props.getAttraction} />
                    </div>}
                </div>
            </div>
        )
     }
}



export default DrawMapRoute; 