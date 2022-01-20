import { connect } from 'react-redux';
import { editUser } from '../../actions/user_actions';
// import { fetchUserItineraries } from '../../actions/itinerary_actions';
import { getUserItineraries } from '../../actions/itinerary_actions';
import Profile from './profile';

const mSTP = (state) => {
  return {
    itineraries: Object.values(state.entities.itineraries),
    currentUser: state.session.user
  };
};

const mDTP = dispatch => {
  return {
    editUser: (id, data) => dispatch(editUser(id, data)),
    getUserItineraries: userId => dispatch(getUserItineraries(userId))
  };
};

export default connect(mSTP, mDTP)(Profile);
