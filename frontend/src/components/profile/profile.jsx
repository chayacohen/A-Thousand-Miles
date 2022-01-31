import React from 'react';
import UserShow from './user_show_container';
import '../../assets/css/profile.scss';
import background from '../../assets/images/profile-background.png'
import ItineraryContainer from "../itineraryindex/itinerary_container"
import AttractionContainer from "../attraction/attraction_container"
import { Route, Switch } from "react-router-dom";
import Attraction from "../attraction/attraction";

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        // console.log(this.props.currentUser.id)
      this.props.clearItinerariesFromState();
      this.props.getUserItineraries(this.props.currentUser.id);
    }
    
    render() {
      return(
        <div className="profile-container">
          <div className="profile-background">
            <img className="profile-background-img" src={background} />
          </div>
          <div className="user-show-container">
            <UserShow />
          </div>
          <div className="index-container">
            <Switch>
              <Route path="/profile/:itineraryId" component={AttractionContainer}/>
              <Route path="/profile" component={ItineraryContainer}/>
            </Switch>
          </div>
        </div>
      )
    }
}

export default Profile;
