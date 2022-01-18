import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import Splash from './splash/splash';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import ProfileContainer from './profile/profile_container';
import navbar_container from './nav/navbar_container';

const App = () => (
    <div>
        <ProtectedRoute component={navbar_container} />
        
        <Switch>
            <AuthRoute exact path="/" component={Splash} /> 
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
            <ProtectedRoute exact path="/profile" component={ProfileContainer} />
        </Switch>
    </div>
);

export default App;