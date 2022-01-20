import React from "react";
import AttractionItemContainer from "./attraction_item_container"
import '../../assets/css/attraction.scss';
class Attraction extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        this.props.getItineraryAttractions(this.props.match.params.itineraryId)
    }

    componentWillUnmount(){
        this.props.clearAttractionsFromState();
    }

    handleSubmit(){
        this.props.history.push("/profile")
    }

    render(){
        const attractionitems = this.props.attractions.map(attraction => {
            return <li key={attraction._id}>
                <AttractionItemContainer attraction={attraction}/>
                </li>
        })
        return(
            <div className="attraction-container">
                    attractions
                    <button onClick={this.handleSubmit}>go back</button>
                <div className="attraction-inner-container">
                    <ul>
                        {attractionitems}   
                    </ul>
                </div>
            </div>
        )
    }
}

export default Attraction;