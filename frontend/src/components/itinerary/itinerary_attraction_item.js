import React from 'react'; 
import '../../assets/css/draw_attraction_item.scss';
import Checkmark from '../../assets/images/checkmark.png';
class ItineraryAttractionItem extends React.Component {

    constructor(props) {
        super(props)
        this.handleAttractionClick = this.handleAttractionClick.bind(this); 
        this.state = {clicked: false}
    }

    componentDidMount() {
        this.props.getAttraction(this.props.attraction._id).then((response) => {
            if (response.attraction.data.isAdded) {
                this.setState({clicked: true})
            }
        })
    }

    handleAttractionClick() {
        if (!this.state.clicked) {
            this.props.editAttraction(this.props.attraction._id, {isAdded: true})
        }
        else {
            this.props.editAttraction(this.props.attraction._id, {isAdded: 'false'})
        }
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        const attraction = this.props.attraction
        return (
            <div className="draw-index-item">
                <div className="draw-header">
                    <div className="draw-image" style={{ backgroundImage: `url(${attraction.photoUrl})` }}>
                        {/* <img src={attraction.photoUrl}></img> */}
                    </div>
                    <button onClick={this.handleAttractionClick}>{this.state.clicked ? `\u2713` : null}</button>
                </div>
                <div className="draw-bottom-half">
                    <p className="draw-index-title">{attraction.title}</p>
                    <p className="draw-address">{attraction.address ? attraction.address : null }</p>
                    <div className="draw-footer">
                        <p>{attraction.rating}</p>
                        <a href={attraction.googleMapLink} target="_blank">Learn more</a>
                    </div>
                </div>
            </div>
        )
    }
}


export default ItineraryAttractionItem; 