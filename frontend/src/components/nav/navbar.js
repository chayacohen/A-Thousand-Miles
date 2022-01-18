import React from 'react';
import { Link } from 'react-router-dom'
// import './navbar.css'

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
                <div>
                    {/* <Link to={'/tweets'}>All Tweets</Link> */}
                    <Link to={'/profile'}>Profile</Link>
                    {/* <Link to={'/new_tweet'}>Write a Tweet</Link> */}
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