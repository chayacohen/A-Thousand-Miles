import { connect } from 'react-redux';
import { editUser } from '../../actions/user_actions';
// import { fetchUserItineraries } from '../../actions/itinerary_actions';
import Profile from './profile';

const mSTP = (state) => {
  return {
    // itineraries: Object.values(state.itineraries.user),
    currentUser: state.session.user,
  };
};

const mDTP = dispatch => {
  return {
    editUser: (id, data) => dispatch(editUser(id, data))
    // fetchUserItineraries: id => dispatch(fetchUserItineraries(id))
  };
};

export default connect(mSTP, mDTP)(Profile);
