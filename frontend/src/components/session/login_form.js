import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../assets/css/sessionform.scss';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderLineErrors = this.renderLineErrors.bind(this);
        this.demoUserSignIn = this.demoUserSignIn.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser === true) {
            this.props.history.push('/profile');
        }
        this.setState({ errors: nextProps.errors })
    }

    componentWillUnmount(){
        this.props.inactiveModal();
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
            password: this.state.password
        };
        
        this.props.login(user)
    }
    
    renderLineErrors(field) {
        return (
            <div className="form-errors">{this.state.errors[field]}</div>
        );
    }

    demoUserSignIn() {
        this.setState({
            email: 'demo@users.com',
            password: 'password'
        })            
    }

    render() {
        return (
            <div className='session-form-container'>
                <form className='session-form' onSubmit={this.handleSubmit}>
                    <div className='login-form-inner'>
                        <h2>Welcome Back</h2>
                        
                        {this.renderLineErrors('email')}
                        <input type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                        />

                        {this.renderLineErrors('password')}
                        <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                        />

                        <input type="submit" value="Login" />
                        <button className='demo-user' onClick={this.demoUserSignIn}>Demo User</button>
                    </div>
                </form>

            </div>
        );
    }
}

export default withRouter(LoginForm);