import React from "react";
import { Link } from "react-router-dom";
import '../../assets/css/startItinerary.scss';

class StartItinerary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {title: '', description: ''}; 
        this.handleInputChange = this.handleInputChange.bind(this); 
        this.handleNextClick = this.handleNextClick.bind(this); 
    }

    handleInputChange(field) {
        return (e) => {
            this.setState({[field]: e.currentTarget.value})
        }
    }

    handleNextClick() {
        this.props.receiveDescription(this.state.description); 
        this.props.receiveTitle(this.state.title); 
        this.props.history.push('/map/1')
    }

    render() {
        return (
            <div className="start-itinerary-container">

                <section>
                    <div className="burn">
                        <div className="start-it-image"></div>
                    </div>
                    <label>Let's Start A New Itinerary</label>
                    <label>
                        Name your trip <img src="https://cdn-icons-png.flaticon.com/512/854/854945.png" />
                    </label>
                    <input type="text" onChange={this.handleInputChange('title')}/>
                    <label>
                        Describe what you are looking forward to on this adventure <img src="https://cdn-icons-png.flaticon.com/512/2232/2232712.png"/>
                    </label>
                    <input type="textarea" rows="2" wrap="hard" onChange={this.handleInputChange('description')}/>
                    { this.state.title && this.state.description ? 
                    <button className="a-active" onClick={this.handleNextClick}>🗺&nbsp;🡪</button>
                    : <button className="a-inactive">🗺&nbsp;🡪</button> }
                </section>
            </div>
        )
    }
}

export default StartItinerary; 