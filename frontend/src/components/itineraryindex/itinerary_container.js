import { connect } from 'react-redux';
import Itinerary from './itinerary';

const mSTP = (state) => {
    return {
        itineraries: Object.values(state.entities.itineraries),
    };
};

const mDTP = dispatch => {
    return {
        
    };
};

export default connect(mSTP, mDTP)(Itinerary);