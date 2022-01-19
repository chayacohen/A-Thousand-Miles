import { connect } from 'react-redux';
import ItineraryItem from './itineraryItem';
import { deleteItinerary, editItinerary } from '../../actions/itinerary_actions';
const mSTP = (state) => {
    return {
        // itineraries: Object.values(state.entities.itineraries),
    };
};

const mDTP = dispatch => {
    return {
        deleteItinerary: id => dispatch(deleteItinerary(id)),
        editItinerary: (id, data) => dispatch(editItinerary(id, data))
    };
};

export default connect(mSTP, mDTP)(ItineraryItem);