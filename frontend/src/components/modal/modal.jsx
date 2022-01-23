import React from 'react';
import LoginFormContainer from '../session/login_form_container';
import SignupFormContainer from '../session/signup_form_container';
import '../../assets/css/modal.scss';

class Modal extends React.Component{
    constructor(props){
        super(props)
        this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
    }
    
    handleBackgroundClick() {
        this.props.inactiveModal(); 
    }

    render(){
        if (!this.props.modal) {
            return null;
        }

        let component;

        switch (this.props.modal) {
            case 'login':
                component = <LoginFormContainer />;
                break;
            case 'signup':
                component = <SignupFormContainer />;
                break;
            default:
                return null;
        }

        return (
            <div className="modal-background" onClick={this.handleBackgroundClick}>
                <div className="modal-child" onClick={e => e.stopPropagation()}>
                    { component }
                </div>
            </div>
        );
    }
}

export default Modal;