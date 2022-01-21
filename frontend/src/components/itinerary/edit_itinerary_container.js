import { connect } from "react-redux";
import EditItinerary from './edit_itinerary'; 
import { editItinerary, getItinerary } from "../../actions/itinerary_actions";
import { createAttraction,  getItineraryAttractions, deleteAttraction} from "../../actions/attraction_actions";

const mapStateToProps = (state, ownProps) => ({
    itinerary: state.entities.itineraries[ownProps.match.params.id]
})

const mapDispatchToProps = (dispatch) => ({
    getItinerary: (itineraryId) => dispatch(getItinerary(itineraryId)),
    editItinerary: (itineraryId, data) => dispatch(editItinerary(itineraryId, data)), 
    createAttraction: (attraction) => dispatch(createAttraction(attraction)), 
    getItineraryAttractions: (itineraryId) => dispatch(getItineraryAttractions(itineraryId)), 
    deleteAttraction: (attractionId) => dispatch(deleteAttraction(attractionId)), 
})

export default connect(mapStateToProps, mapDispatchToProps)(EditItinerary); 