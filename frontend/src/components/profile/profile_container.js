import { connect } from 'react-redux';
import { fetchUserItineraries } from '../../actions/itinerary_actions';
import Profile from './profile';

const mSTP = (state) => {
  return {
    tweets: Object.values(state.tweets.user),
    currentUser: state.session.user
  };
};

const mDTP = dispatch => {
  return {
    fetchUserTweets: id => dispatch(fetchUserItineraries(id))
  };
};

export default connect(mSTP, mDTP)(Profile);
