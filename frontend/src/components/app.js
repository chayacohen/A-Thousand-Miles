import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import '../assets/css/reset.scss';

import Splash from './splash/splash';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import DrawMapContainer from './map/draw_map_container';
import ProfileContainer from './profile/profile_container';
import NavbarContainer from './nav/navbar_container';
import PlannerContainer from './planner/planner_container';
import EnterAddressContainer from './map/enter_address_container';
import StartItineraryContainer from './itinerary/start_itinerary_container'

const KEYS = require("../keys");

const App = () => {
    
    const head = document.head
    const googleScript = document.createElement('script')
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${KEYS.googleAPI}&libraries=places,drawing`
    head.appendChild(googleScript);
    
    return(
    <div>
        <ProtectedRoute component={NavbarContainer} />
        
        <Switch>
            <AuthRoute exact path="/" component={Splash} /> 
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
            <ProtectedRoute exact path="trip/map/draw" component={DrawMapContainer}/>
            <ProtectedRoute exact path = "trip/map/:id" component={EnterAddressContainer}/>
            <ProtectedRoute exact path="/trip/new" component={StartItineraryContainer}/>
            <ProtectedRoute exact path="/profile" component={ProfileContainer} />
            <ProtectedRoute exact path="/planner" component={PlannerContainer} />
        </Switch>
    </div>
)};

export default App;