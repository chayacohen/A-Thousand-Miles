import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import '../../assets/css/navbar.scss';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
        this.handleModal = this.handleModal.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.clearItinerariesFromState();
        this.props.logout();
    }

    handleModal(modal){
        this.props.openModal(modal);
    }
    getLinks() {
        if (this.props.loggedIn) {
            const firstPath = this.props.location.pathname.split("/")[1]

            if ( firstPath === 'trip' || firstPath === 'itinerary') {
                return (
                <div className='navbar'>
                    <NavLink to={'/profile'}>Profile</NavLink>
                    <NavLink className="nav-l" to={'/trip/new'}>Trip Planner</NavLink>
                    <a onClick={this.logoutUser}>Logout</a>
                </div>
            )} else {
            return (
                <div className='navbar'>
                    <NavLink activeClassName="nav-l" to={'/profile'}>Profile</NavLink>
                    <NavLink activeClassName="nav-l" to={'/trip/new'}>Trip Planner</NavLink>
                    <a onClick={this.logoutUser}>Logout</a>
                </div>
            )}

        } else {
            return (
                <div className='links'>
                    <div><span onClick={() => this.handleModal('signup')}>Signup</span></div>
                    <div><span onClick={() => this.handleModal('login')}>Login</span></div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className='links-container'>
                {this.getLinks()}
            </div>
        );
    }
}

export default NavBar;