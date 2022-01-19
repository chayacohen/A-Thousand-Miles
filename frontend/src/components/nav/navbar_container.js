import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { activeModal } from '../../actions/modal_actions';
import NavBar from './navbar';

const mSTP = state => ({
    loggedIn: state.session.isAuthenticated
});

const mDTP = dispatch => ({
    openModal: (modal) => dispatch(activeModal(modal)),
    logout: () => dispatch(logout())
})

export default connect(mSTP, mDTP)(NavBar);