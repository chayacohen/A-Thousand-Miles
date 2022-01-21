import React from "react";
import AttractionItemContainer from "./attraction_item_container"
import '../../assets/css/attraction.scss';
import backArrow from '../../assets/images/back-arrow.png';
class Attraction extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.checkAttractions = this.checkAttractions.bind(this)
        this.checkItinerary = this.checkItinerary.bind(this)
    }

    componentDidMount(){
        this.props.getItineraryAttractions(this.props.match.params.itineraryId, {boolean: true})
    }

    componentWillUnmount(){
        this.props.clearAttractionsFromState();
    }

    handleSubmit(){
        this.props.history.push("/profile")
    }

    

    checkAttractions(){
        const attractionitems = this.props.attractions.map(attraction => {
            return <li key={attraction._id}>
                <AttractionItemContainer attraction={attraction} />
            </li>
        })

        if(this.props.attractions.length === 0){
            return (
                <div className="add-attraction-text">
                    <span>Edit your itinerary and add some attractions!</span>
                </div>
            )
        } else {
            return (
                <div className="attraction-inner-container">
                    <ul>
                        {attractionitems}
                    </ul>
                </div>
            )
        }
    }
    
    checkItinerary(){
        if(!this.props.itinerary){
            return (
                <></>
            )
        } else {
            return(
                <div className="itinerary-index-title">
                    <span>{this.props.itinerary.title}</span>
                </div>
            )
        }

    }

    render(){
        // const attractionitems = this.props.attractions.map(attraction => {
        //     return <li key={attraction._id}>
        //         <AttractionItemContainer attraction={attraction}/>
        //         </li>
        // })
        // debugger
        const attraction = this.checkAttractions()
        const title = this.checkItinerary()
        return(
            <div className="attraction-wrapper">
                    {title}
                <div className="attraction-container">
                    {/* <div className="attraction-inner-container"> */}
                        {attraction}
                    {/* </div> */}
                    <div className="back-arrow">
                    <img alt="travel" src={backArrow} onClick={this.handleSubmit}/>
                        {/* <button onClick={this.handleSubmit}>go back</button> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Attraction;