import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import '../assets/css/reset.scss';


import Splash from './splash/splash';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import DrawMapRoute from './map/draw_map_page';
import ProfileContainer from './profile/profile_container';
import NavbarContainer from './nav/navbar_container';
import PlannerContainer from './planner/planner_container';

const App = () => (
    <div>
        <ProtectedRoute component={NavbarContainer} />
        
        <Switch>
            <AuthRoute exact path="/" component={Splash} /> 
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
            <Route exact path="/map" component={DrawMapRoute}/>
            <ProtectedRoute exact path="/profile" component={ProfileContainer} />
            <ProtectedRoute exact path="/planner" component={PlannerContainer} />
        </Switch>
    </div>
);

export default App;