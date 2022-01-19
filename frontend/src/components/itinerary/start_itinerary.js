import React from "react";
import { Link } from "react-router-dom";

class StartItinerary extends React.Component {

    render() {
        return (
            <form>
                <label>
                    Title
                </label>
                <input type="text"/>
                <label>
                    Description
                </label>
                <input type="text"/>
                <Link to="/trip/map/1">Next</Link>
            </form>
        )
    }
}

export default StartItinerary; 