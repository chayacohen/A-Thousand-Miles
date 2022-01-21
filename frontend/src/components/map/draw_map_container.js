import { connect } from "react-redux";
import DrawMap from "./draw_map_page";
import { editItinerary, getItinerary } from "../../actions/itinerary_actions";
import { createAttraction, editAttraction, getItineraryAttractions} from "../../actions/attraction_actions";
import { clearItineraryForm } from "../../actions/itinerary_form_actions";

const mapStateToProps = (state, ownProps) => ({
    itinerary: state.entities.itineraries[ownProps.match.params.id]
})

const mapDispatchToProps = (dispatch) => ({
    editItinerary: (itineraryId, data) => dispatch(editItinerary(itineraryId, data)), 
    createAttraction: (itineraryId, data) => dispatch(createAttraction(itineraryId, data)), 
    editAttraction: (attractionId, data) => dispatch(editAttraction(attractionId, data)), 
    getItineraryAttractions: (itineraryId, data) => dispatch(getItineraryAttractions(itineraryId, data)), 
    clearItineraryForm: () => dispatch(clearItineraryForm()), 
    getItinerary: (id) => dispatch(getItinerary(id))
})



export default connect(mapStateToProps, mapDispatchToProps)(DrawMap); 