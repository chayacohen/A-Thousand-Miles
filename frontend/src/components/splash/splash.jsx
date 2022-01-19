import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../nav/navbar_container';
import Modal from '../modal/modal_container'
import '../../assets/css/splash.scss';
import splashOne from '../../assets/images/splashroad.jpg';
import splashTwo from '../../assets/images/splashballoonsmall.jpg';
import splashThree from '../../assets/images/splashplanningsmall.jpg';
import splashFinal from '../../assets/images/contourmap.jpg'

class Splash extends React.Component{
    render(){
        return(
            <div className='splash-container'>
                <div className='splash-intro'>
                    <div className='splash-intro-bar'><div className='splash-intro-inner'></div></div>
                    
                    <div className='splash-intro-content'>
                        <div className='splash-intro-content2'>
                            <h1>A Thousand Miles</h1>
                            <h5>See what advertures await with a stroke of a brush</h5>
                            <Navbar className='splash-signup'/>
                            <Modal />
                        </div>
                        <img alt="travel" src={splashOne} className='splash-one-image' />
                    </div>
                </div>
                <div className='splash-second'>
                    <div>
                        <img alt="travel" src={splashTwo} className='splash-two-image' />
                    </div>
                    <div className='s2'>
                        <h2>Find new attractions on your way to your destination.</h2>
                        <h3>Draw out a general path and we'll guide you the rest of the way there.</h3>
                    </div>
                </div>
                <div className='splash-third'>
                    <div className='s3'>
                        <h2>Never miss out on hidden gems along the way.</h2>
                        <h3>Make your roadtrip into a lifetime memory.</h3>
                    </div>
                    <div>
                        <img alt="travel" src={splashThree} className='splash-three-image' />
                    </div>
                </div>
                <div className='splash-final'>
                    <div className='splash-final-content'>
                        <h2>Ready to start your journey?</h2>
                        <div className='sfl'><Link to={'/signup'}>Signup</Link></div>
                        <img alt="travel" src={splashFinal} className='splash-final-image' />
                    </div>
                </div>
           </div>
    )}     
}

export default Splash;

// Extra features
// Optimize your route
// Make the most of your day. We’ll plan the best route to visit your must-sees.

// Collaborate with friends in real time
// Plan along with your friends with live syncing and collaborative editing.