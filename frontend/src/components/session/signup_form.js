import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../assets/css/sessionform.scss';

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
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.signedIn === true) {
            this.props.history.push('/profile');
        }

        this.setState({ errors: nextProps.errors })
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

    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
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

    render() {
        return (
            <div className="session-form-container">
                <form className='session-form' onSubmit={this.handleSubmit}>
                    <div className="session-form-inner">
                        <h2>Let's get you started</h2>
                        <input type="text"
                            value={this.state.username}
                            onChange={this.update('username')}
                            placeholder="Username"
                        />
                        <input type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                        />
                        <input type="text"
                            // value={this.state.address}
                            // onChange={this.update('address')}
                            placeholder="Address"
                            id='autocomplete'
                        />
                        <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                        />
                        <input type="password"
                            value={this.state.password2}
                            onChange={this.update('password2')}
                            placeholder="Confirm Password"
                        />
                        <input type="submit" value="Sign Up" />
                        {this.renderErrors()}
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(SignupForm);