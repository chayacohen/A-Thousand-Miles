import React from "react";
import { Link } from "react-router-dom";

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
            <section>
                <label>
                    Title
                </label>
                <input type="text" onChange={this.handleInputChange('title')}/>
                <label>
                    Description
                </label>
                <input type="text" onChange={this.handleInputChange('description')}/>
                { this.state.title && this.state.description ? 
                <button onClick={this.handleNextClick}>Next</button> : null }
            </section>
        )
    }
}

export default StartItinerary; 