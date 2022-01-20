import React from "react";

class Attraction extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getItineraryAttractions(this.props.match.params.itineraryId)
    }

    componentWillUnmount(){
        this.props.clearAttractionsFromState();
    }

    render(){
        const attractionitems = this.props.attractions.map(attraction => {
            return <li>{attraction.title}</li>
        })
        // debugger
        return(
            <div>
                attractions
                please show
                {attractionitems}
            </div>
        )
    }
}

export default Attraction;