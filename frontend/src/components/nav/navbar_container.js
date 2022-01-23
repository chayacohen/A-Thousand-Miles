import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { activeModal } from '../../actions/modal_actions';
import { clearItinerariesFromState } from '../../actions/itinerary_actions';
import NavBar from './navbar';

const mSTP = state => ({
    loggedIn: state.session.isAuthenticated
});

const mDTP = dispatch => ({
    openModal: (modal) => dispatch(activeModal(modal)),
    logout: () => dispatch(logout()),
    clearItinerariesFromState: () => dispatch(clearItinerariesFromState())
})

export default connect(mSTP, mDTP)(NavBar);