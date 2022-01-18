import { connect } from 'react-redux';
import { fetchUserItineraries } from '../../actions/itinerary_actions';
import Profile from './profile';

const mSTP = (state) => {
  return {
    itineraries: Object.values(state.itineraries.user),
    currentUser: state.session.user
  };
};

const mDTP = dispatch => {
  return {
    fetchUserItineraries: id => dispatch(fetchUserItineraries(id))
  };
};

export default connect(mSTP, mDTP)(Profile);
