import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import '../../assets/css/navbar.scss';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    // Selectively render links dependent on whether the user is logged in
    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div className='navbar'>
                    {/* <Link to={'/tweets'}>All Tweets</Link> */}
                    <NavLink to={'/profile'}>Profile</NavLink>
                    <NavLink to={'/planner'}>Trip Planner</NavLink>
                    <button onClick={this.logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div className='links'>
                    <div><Link to={'/signup'}>Signup</Link></div>
                    <div><Link to={'/login'}>Login</Link></div>
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