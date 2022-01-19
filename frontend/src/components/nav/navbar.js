import React from 'react';
import { NavLink } from 'react-router-dom'
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
        this.props.logout();
    }

    handleModal(modal){
        this.props.openModal(modal);
    }
    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div className='navbar'>
                    <NavLink to={'/profile'}>Profile</NavLink>
                    <NavLink to={'/planner'}>Trip Planner</NavLink>
                    <button onClick={this.logoutUser}>Logout</button>
                </div>
            );
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