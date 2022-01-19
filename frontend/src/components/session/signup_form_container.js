import { connect } from 'react-redux';
import { signup, login } from '../../actions/session_actions';
import { inactiveModal } from '../../actions/modal_actions';
import SignupForm from './signup_form';

const mSTP = (state) => {
    return {
        signedIn: state.session.isSignedIn,
        errors: state.errors.session
    };
};

const mDTP = (dispatch) => {
    return {
        signup: user => dispatch(signup(user)),
        login: user => dispatch(login(user)),
        inactiveModal: () => dispatch(inactiveModal())
    }
}

export default connect(mSTP, mDTP)(SignupForm);