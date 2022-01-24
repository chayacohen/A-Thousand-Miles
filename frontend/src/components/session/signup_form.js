import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../assets/css/sessionform.scss';
const google = window.google;
class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            password2: '',
            address: '',
            lat: '',
            lng: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearedErrors = false;
        this.onPlaceChanged = this.onPlaceChanged.bind(this);
        this.renderLineErrors = this.renderLineErrors.bind(this);
        this.demoUserSignIn = this.demoUserSignIn.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let user = {
            email: this.state.email,
            password: this.state.password,
        };

        if (nextProps.signedIn === true) {
            this.props.login(user)
            this.props.history.push('/profile');
        }

        this.setState({ errors: nextProps.errors })
    }

    componentWillUnmount(){
        this.props.inactiveModal()
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2,
            address: this.state.address,
            lat: this.state.lat,
            lng: this.state.lng
        };

        this.props.signup(user, this.props.history);
    }

    renderLineErrors(field) {
        return (
            <div className="form-errors">{this.state.errors[field]}</div>
        );
    }

    onPlaceChanged() {
        const place = this.autocomplete.getPlace();
        
        if (!place.geometry) {
            document.getElementById('autocomplete').placeholder = 'Address'
        }
        else {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            const address = place.formatted_address;
            this.setState({address: address, lat: lat, lng: lng});
            this.autocomplete.value = address;
        }
    }

    componentDidMount(){

        this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {
            componentRestrictions: { 'country': ['US'] },
            fields: ['place_id', 'geometry', 'formatted_address']
        })
        const autocomplete = this.autocomplete;
        autocomplete.addListener('place_changed', this.onPlaceChanged)
    }

    demoUserSignIn() {

        let user = {
            email: 'demo@users.com',
            password: 'password'
        };

        this.props.login(user)
    }

    render() {
        return (
            <div className="session-form-container">
                <form className='session-form' onSubmit={this.handleSubmit}>
                    <div className="session-form-inner">
                        <h2>Let's get you started</h2>
                        
                        <div className='form-split'>
                        <div className='form-right'>
                            {this.renderLineErrors('username')}
                            <input type="text"
                                value={this.state.username}
                                onChange={this.update('username')}
                                placeholder="Username"
                            />
                            {this.renderLineErrors('email')}
                            <input type="text"
                                value={this.state.email}
                                onChange={this.update('email')}
                                placeholder="Email"
                            />
                            {this.renderLineErrors('address')}
                            <input type="text"
                                placeholder="Address"
                                id='autocomplete'
                            />
                            {this.renderLineErrors('password')}
                            <input type="password"
                                value={this.state.password}
                                onChange={this.update('password')}
                                placeholder="Password"
                            />
                            {this.renderLineErrors('password2')}
                            <input type="password"
                                value={this.state.password2}
                                onChange={this.update('password2')}
                                placeholder="Confirm Password"
                            />
                        </div>

                        <div className='form-right'>
                            <input type="submit" value="Sign Up"/>
                            <button className='demo-user' onClick={this.demoUserSignIn}>Demo User</button>
                        </div>
                        </div>

                    </div>
                </form>

            </div>
        );
    }
}

export default withRouter(SignupForm);