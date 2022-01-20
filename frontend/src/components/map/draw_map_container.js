import { connect } from "react-redux";
import DrawMap from "./draw_map_page";
import { editItinerary } from "../../actions/itinerary_actions";
import { createAttraction, editAttraction, getItineraryAttractions} from "../../actions/attraction_actions";

const mapStateToProps = (state) => ({
    // address: state.currentUser.address, 
    // lat: state.currentUser.lat, 
    // lng: state.currentUser.lng
    startAddress: state.ui.starting,
    endAddress: state.ui.ending
})

const mapDispatchToProps = (dispatch) => ({
    editItinerary: (itineraryId, data) => dispatch(editItinerary(itineraryId, data)), 
    createAttraction: (itineraryId, data) => dispatch(createAttraction(itineraryId, data)), 
    editAttraction: (attractionId, data) => dispatch(editAttraction(attractionId, data)), 
    getItineraryAttractions: (itineraryId, data) => dispatch(getItineraryAttractions(itineraryId, data)), 
})



export default connect(mapStateToProps, mapDispatchToProps)(DrawMap); 