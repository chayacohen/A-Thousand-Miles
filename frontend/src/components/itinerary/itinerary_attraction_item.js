import React from 'react'; 

class ItineraryAttractionItem extends React.Component {

    constructor(props) {
        super(props)
        this.handleAttractionClick = this.handleAttractionClick.bind(this); 
    }

    handleAttractionClick() {
        if (this.props.attraction.isAdded === false) {
            debugger 
            this.props.editAttraction(this.props.attraction._id, {isAdded: true})
        }
        else {
            this.props.editAttraction(this.props.attraction._id, { isAdded: false }) 
        }
    }

    render() {
        return (
            <div>
                <p>{this.props.attraction.title}</p>
                <button onClick={this.handleAttractionClick}>Add</button>
            </div>
        )
    }
}


export default ItineraryAttractionItem; 