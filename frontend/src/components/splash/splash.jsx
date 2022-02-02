import React from 'react';
import { withRouter, Link} from 'react-router-dom';
import Navbar from '../nav/navbar_container';
import Modal from '../modal/modal_container'
import '../../assets/css/splash.scss';
import splashOne from '../../assets/images/splashroad.jpg';
import splashTwo from '../../assets/images/splashballoonsmall.jpg';
import splashThree from '../../assets/images/splashplanningsmall.jpg';
import splashFinal from '../../assets/images/contourmap.jpg'
import github from '../../assets/images/github.png';
import linkedin from '../../assets/images/linkedin.png';
import angellist from '../../assets/images/angellist.png';
import portfolio from '../../assets/images/portfolio.png';
class Splash extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            about: false
        }
        this.splashOrAbout = this.splashOrAbout.bind(this)
        this.toggleAbout = this.toggleAbout.bind(this)
    }

    splashOrAbout(){
        if (!this.state.about) {
            return "splash-card"
        } else {
            return "splash-card flipped"
        }
    }

    toggleAbout(){
        return (e) => {
            this.setState({ about: !this.state.about })
        };
    }

    render(){

        const splashClass = this.splashOrAbout();
        return(
            <div className='splash-container'>
                <button className= "about-us-button" onClick={this.toggleAbout()}>Click to learn more about us!</button>
                <div className='splash-intro'>
                    <div className='splash-intro-bar'><div className='splash-intro-inner'></div></div>
                    
                    <div className='splash-intro-content'>
                        <div className='splash-intro-content2'>
                            <h1>A Thousand Miles</h1>
                            <h5>See what advertures await with a stroke of a brush</h5>
                            <Navbar className='splash-signup'/>
                            <Modal />
                        </div>
                        <div className={splashClass}>
                            <div className='splash-card-inner'>
                                <div className='splash-card-front'>
                                    <img alt="travel" src={splashOne}/>
                                </div>
                                <div className='splash-card-back'>
                                    <div className='splash-card-header-container'>
                                        <div className='splash-card-header'>
                                            <h2>Click <a href="https://github.com/chayacohen/A-Thousand-Miles" target="_blank"> here </a> to see this project's repository or check any of us out below!</h2>
                                        </div>
                                    </div>
                                    <div className='person'>
                                        <div className='person-info'>

                                            <div className='person-info-name'>
                                                <h3>Chaya Cohen</h3>
                                            </div>
                                            <div className='person-info-links-container'>
                                                <div className='person-info-link-item'>
                                                    <div className='person-info-link-header'>
                                                        Github
                                                    </div>
                                                    <div className='person-info-link'>
                                                        <a href="https://github.com/chayacohen" target="_blank"> <img src={github}/> </a>
                                                    </div>
                                                </div>
                                                <div className='person-info-link-item'>
                                                    <div className='person-info-link-header'>
                                                        LinkedIn
                                                    </div>
                                                    <div className='person-info-link'>
                                                        <a href="https://www.linkedin.com/in/chaya-cohen-6a3035142/" target="_blank"> <img src={linkedin}/> </a>
                                                    </div>
                                                </div>
                                                <div className='person-info-link-item'>
                                                    <div className='person-info-link-header'>
                                                        AngelList
                                                    </div>
                                                    <div className='person-info-link'>
                                                        <a href="https://angel.co/u/chaya-cohen-1" target="_blank"> <img src={angellist}/> </a>
                                                    </div>
                                                </div>
                                                <div className='person-info-link-item'>
                                                    <div className='person-info-link-header'>
                                                        Portfolio
                                                    </div>
                                                    <div className='person-info-link'>
                                                        <a href="https://github.com/linb1" target="_blank"> <img src={portfolio}/> </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='divider'></div>
                                        </div>

                                        <div className='person-info'>
                                            <div className='person-info-name'>
                                                <h3>Nicholas Barrameda</h3>
                                            </div>
                                            <div className='person-info-links-container'>
                                                <div className='person-info-link-item'>
                                                    <div className='person-info-link-header'>
                                                        Github
                                                    </div>
                                                    <div className='person-info-link'>
                                                        <a href="https://github.com/nick-barr" target="_blank"> <img src={github} /> </a>
                                                    </div>
                                                </div>
                                                <div className='person-info-link-item'>
                                                    <div className='person-info-link-header'>
                                                        LinkedIn
                                                    </div>
                                                    <div className='person-info-link'>
                                                        <a href="https://www.linkedin.com/in/nicholas-barrameda/" target="_blank"> <img src={linkedin} /> </a>
                                                    </div>
                                                </div>
                                                <div className='person-info-link-item'>
                                                    <div className='person-info-link-header'>
                                                        AngelList
                                                    </div>
                                                    <div className='person-info-link'>
                                                        <a href="https://angel.co/u/nicholas-barrameda" target="_blank"> <img src={angellist} /> </a>
                                                    </div>
                                                </div>
                                                <div className='person-info-link-item'>
                                                    <div className='person-info-link-header'>
                                                        Portfolio
                                                    </div>
                                                    <div className='person-info-link'>
                                                        <a href="https://github.com/linb1" target="_blank"> <img src={portfolio} /> </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='divider'></div>
                                        </div>

                                        <div className='person-info'>
                                            <div className='person-info-name'>
                                                <h3>Brian Lin</h3>
                                            </div>
                                            <div className='person-info-links-container'>
                                                <div className='person-info-link-item'>
                                                    <div className='person-info-link-header'>
                                                        Github
                                                    </div>
                                                    <div className='person-info-link'>
                                                        <a href="https://github.com/linb1" target="_blank"> <img src={github} /> </a>
                                                    </div>
                                                </div>
                                                <div className='person-info-link-item'>
                                                    <div className='person-info-link-header'>
                                                        LinkedIn
                                                    </div>
                                                    <div className='person-info-link'>
                                                        <a href="https://www.linkedin.com/in/brian-lin-1590/" target="_blank"> <img src={linkedin} /> </a>
                                                    </div>
                                                </div>
                                                <div className='person-info-link-item'>
                                                    <div className='person-info-link-header'>
                                                        AngelList
                                                    </div>
                                                    <div className='person-info-link'>
                                                        <a href="https://angel.co/u/brian-lin-40" target="_blank"> <img src={angellist} /> </a>
                                                    </div>
                                                </div>
                                                <div className='person-info-link-item'>
                                                    <div className='person-info-link-header'>
                                                        Portfolio
                                                    </div>
                                                    <div className='person-info-link'>
                                                        <a href="https://linb1.github.io/portfolio/" target="_blank"> <img src={portfolio} /> </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='divider'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* {splashOne}  */}
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
                        <div className='sfl'><a onClick={()=>window.scrollTo({top: 0, behavior: "smooth"})}>Signup</a></div>
                        <img alt="travel" src={splashFinal} className='splash-final-image' />
                    </div>
                </div>
           </div>
    )}     
}

export default withRouter(Splash);

// Extra features
// Optimize your route
// Make the most of your day. We’ll plan the best route to visit your must-sees.

// Collaborate with friends in real time
// Plan along with your friends with live syncing and collaborative editing.