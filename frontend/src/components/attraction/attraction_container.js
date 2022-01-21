import { connect } from 'react-redux';
import Attraction from './attraction';
import { getItineraryAttractions, clearAttractionsFromState } from "../../actions/attraction_actions"
import { withRouter } from 'react-router-dom';
const mSTP = (state, ownProps) => {
    return {
        attractions: Object.values(state.entities.attractions),
        itinerary: state.entities.itineraries[ownProps.match.params.itineraryId]
    };
};

const mDTP = dispatch => {
    return {
        getItineraryAttractions: (itineraryId, data) => dispatch(getItineraryAttractions(itineraryId, data)),
        clearAttractionsFromState: () => dispatch(clearAttractionsFromState()),
    };
};

export default withRouter(connect(mSTP, mDTP)(Attraction));