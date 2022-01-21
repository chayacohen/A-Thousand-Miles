import React from 'react'; 
import '../../assets/css/draw_attraction_item.scss';
import Checkmark from '../../assets/images/checkmark.png';
class ItineraryAttractionItem extends React.Component {

    constructor(props) {
        super(props)
        this.handleAttractionClick = this.handleAttractionClick.bind(this); 
        this.state = {clicked: false}
    }

    handleAttractionClick() {
        if (this.props.attraction.isAdded === false) {
            this.props.editAttraction(this.props.attraction._id, {isAdded: true})
        }
        else {
            this.props.editAttraction(this.props.attraction._id, { isAdded: false }) 
        }
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        const attraction = this.props.attraction
        return (
            <div className="draw-index-item">
                <div className="draw-header">
                    <p className="draw-index-title">{attraction.title}</p>
                    <button onClick={this.handleAttractionClick}>
                        <img src={this.state.clicked ? Checkmark : null}></img></button>
                </div>
                <div className="draw-image" style={{backgroundImage: `url(${attraction.photoUrl})`}}>
                    {/* <img src={attraction.photoUrl}></img> */}
                </div>
                <p>{attraction.address ? attraction.address : null }</p>
                <p>{attraction.rating}</p>
                <a href={attraction.googleMapLink}></a>
            </div>
        )
    }
}


export default ItineraryAttractionItem; 