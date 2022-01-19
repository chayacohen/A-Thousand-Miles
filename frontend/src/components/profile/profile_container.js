import { connect } from 'react-redux';
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
    getUserItineraries: userId => dispatch(getUserItineraries(userId))
  };
};

export default connect(mSTP, mDTP)(Profile);
