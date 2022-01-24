import { connect } from 'react-redux';
import { login, clearSessionErrors } from '../../actions/session_actions';
import { inactiveModal } from '../../actions/modal_actions';
import LoginForm from './login_form';

const mSTP = (state) => {
    return {
        errors: state.errors.session
    };
};

const mDTP = (dispatch) => {
    return {
        login: user => dispatch(login(user)),
        inactiveModal: () => dispatch(inactiveModal()),
        clearSessionErrors: () => dispatch(clearSessionErrors())
    }
}

export default connect(mSTP, mDTP)(LoginForm);