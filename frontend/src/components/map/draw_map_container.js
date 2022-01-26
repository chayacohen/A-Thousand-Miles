import { connect } from "react-redux";
import DrawMap from "./draw_map_page";
import { editItinerary, getItinerary } from "../../actions/itinerary_actions";
import { createAttraction, editAttraction, getItineraryAttractions, getAttraction} from "../../actions/attraction_actions";

const mapStateToProps = (state, ownProps) => ({
    itinerary: state.entities.itineraries[ownProps.match.params.id]
})

const mapDispatchToProps = (dispatch) => ({
    editItinerary: (itineraryId, data) => dispatch(editItinerary(itineraryId, data)), 
    createAttraction: (itineraryId, data) => dispatch(createAttraction(itineraryId, data)), 
    editAttraction: (attractionId, data) => dispatch(editAttraction(attractionId, data)), 
    getItineraryAttractions: (itineraryId, data) => dispatch(getItineraryAttractions(itineraryId, data)), 
    getItinerary: (id) => dispatch(getItinerary(id)),
    getAttraction: (id) => dispatch(getAttraction(id))
})



export default connect(mapStateToProps, mapDispatchToProps)(DrawMap); 