import React from 'react'; 

class ItineraryAttractionItem extends React.Component {

    constructor(props) {
        super(props)
        this.handleAttractionClick = this.handleAttractionClick.bind(this); 
    }

    handleAttractionClick() {
        const attraction = {
            title: this.props.result.name,
            lat: this.props.result.geometry.location.lat().toString(),
            lng: this.props.result.geometry.location.lat().toString(),
            photoUrl: this.props.result.photos ? this.props.result.photos[0].getUrl() : null,
            rating: this.props.result.rating.toString(),
            placeId: this.props.result.place_id,
            googleLink: `https://www.google.com/maps/place/?q=place_id:${this.props.result.place_id}`
        }
        this.props.createAttraction(this.props.itineraryId, attraction)
    }

    render() {
        return (
            <div key={this.props.key}>
                <p>{this.props.result.name}</p>
                <button onClick={this.handleAttractionClick}>Add</button>
            </div>
        )
    }
}


export default ItineraryAttractionItem; 