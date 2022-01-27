import React from "react";
import Map from "../map/map";
import MarkerManager from "../map/marker_manager";
import ItineraryAttractionItem from "./itinerary_attraction_item";
import '../../assets/css/draw_attraction_item.scss'
const google = window.google;
class EditItinerary extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {itineraryAttractions: [], line: [], 
            editDes: false, 
            editTitle: false, 
            title: this.props.itinerary ? this.props.itinerary.title : '', 
            description: this.props.itinerary ? this.props.itinerary.description : '', 
            start_pos: '', 
            end_pos: '' 
        }
        this.changeLineForMap = this.changeLineForMap.bind(this); 
        this.handleInputChange = this.handleInputChange.bind(this); 
        this.handleSaveClick = this.handleSaveClick.bind(this); 
        this.handleMapBounds = this.handleMapBounds.bind(this); 
    }

    handleInputChange(field) {
        return (e) => {
            this.setState({[field]: e.currentTarget.value})
        }
    }

    handleEditClick(field) {
        return () => {
            this.setState({[field]: true})
        }
    }

    handleSaveClick() {
        const data = {
            title: this.state.title, 
            description: this.state.description
        }
        this.props.editItinerary(this.props.itinerary._id, data).then(() => {
            this.setState({editTitle: false, editDes: false})
        })
    }

    componentDidMount() {
        this.map = new Map(this.mapNode)
        this.markerManager = new MarkerManager(this.map)
        this.map.instantiateMap();
        this.map.map.setZoom(4)
        this.props.getItinerary(this.props.match.params.id).then((response) => {
            const itinerary = response.itinerary.data; 
            this.setState({title: itinerary.title, description: itinerary.description})
            this.itineraryAttractions = '';
            this.props.getItineraryAttractions(this.props.match.params.id, {boolean: false}).then(response => {
                this.setState({ itineraryAttractions: response.attractions.data})
                this.state.itineraryAttractions.forEach(attraction => {
                    this.markerManager.addMarker({lat: attraction.lat, lng: attraction.lng}, {url: attraction.icon, scaledSize: new google.maps.Size(20,20)})
                }) 
            })
            // this.setState({line: this.props.itinerary.line})
            this.changeLineForMap();
            this.setState({ start_pos: new google.maps.LatLng(itinerary.start_lat, itinerary.start_lng), end_pos: new google.maps.LatLng(itinerary.end_lat, itinerary.end_lng) }) 
            this.markerManager.addMarker(this.state.start_pos, {
                url: 'https://cdn-icons-png.flaticon.com/512/25/25694.png', scaledSize: new google.maps.Size(30, 30)
            })
            this.markerManager.addMarker(this.state.end_pos, {
                url: 'https://cdn-icons-png.flaticon.com/512/1072/1072569.png', scaledSize: new google.maps.Size(30, 30)
            })
            this.state.line.forEach((location, index) => {
                this.map.poly.getPath().insertAt(index, location); 
            })
            this.handleMapBounds(); 


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

    changeLineForMap() {
        const line = this.props.itinerary.line; 
        const newLine = []; 
        line.forEach(location => {
            const latLng = new google.maps.LatLng(location.lat, location.lng)
            newLine.push(latLng); 
        })
        this.setState({line: newLine})
    };

    // we have to find a way to store all attractions, unless we refetch based on the same algorithm. Possibly we can make an attribute of attraction a boolean of true or false and then based on if true, it is part of itinerary. Or keep two seperate attraction types?
    
    render () {

        // if (!this.state.itineraryAttractions || !this.props.itinerary) {
        //     return(
        //         <div className="edit-map-container" style={{ width: '300px', height: '300px' }}>
        //             <div className="map" ref={map => this.mapNode = map} style={{height: '100%', width: '100%'}}></div>
        //         </div>
        //     ) 
        // }

        return (
            <div className="draw-map">
                <div className="map-and-attractions">
                    <div className="left-page">
                        <div>
                            {this.state.editTitle ? 
                            <div className="draw-edit-property">
                                <input className="draw-title" value={this.state.title} onChange={this.handleInputChange("title")}/>
                                <button onClick={this.handleSaveClick}>Save</button>
                            </div>
                            : 
                            <div id="edit-title-draw">
                                <p onClick={this.handleEditClick("editTitle")} className="draw-pencil">{'\u270E'}</p>
                                <h1 className="draw-title">{this.props.itinerary ? this.props.itinerary.title : ''}</h1>
                            </div> }
                            {this.state.editDes ? 
                            <div className="draw-edit-property">
                                <input className="draw-description" value={this.state.description} onChange={this.handleInputChange('description')}/>
                                <button onClick={this.handleSaveClick}>Save</button>
                            </div>
                            :
                            <div id="edit-description-draw">
                                <p onClick={this.handleEditClick("editDes")} className="draw-pencil">{'\u270E'}</p>
                                 <p className="draw-description">{this.props.itinerary ? this.props.itinerary.description : ''}</p>
                            </div>}
                        </div>
                    <div className="after-draw-map-container">
                        <div className="map" id="done-draw-map" ref={map => this.mapNode = map}></div>
                    </div>
                </div>
                    <div className="attraction-index">
                        <div className="draw-attraction-item">
                            {this.state.itineraryAttractions.map((attraction, index) => (
                                <div className="draw-item">
                                    <ItineraryAttractionItem key={index} attraction={attraction} editAttraction={this.props.editAttraction} getAttraction={this.props.getAttraction}
                                    itineraryId={this.props.itinerary.id} />
                                </div>
                            ))}
                        </div >
                    </div>
                </div>
            </div> 
        )
    }


}

export default EditItinerary;