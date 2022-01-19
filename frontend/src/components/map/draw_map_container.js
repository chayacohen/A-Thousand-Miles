import { connect } from "react-redux";
import DrawMap from "./draw_map_page";
import { clearItineraryForm } from "../../actions/itinerary_form_actions";

const mapStateToProps = (state) => ({
    // address: state.currentUser.address, 
    // lat: state.currentUser.lat, 
    // lng: state.currentUser.lng
    startAddress: state.ui.starting,
    endAddress: state.ui.ending
})

const mapDispatchToProps = (dispatch) => ({
    clearItineraryForm: () => dispatch(clearItineraryForm()),
})



export default connect(mapStateToProps, mapDispatchToProps)(DrawMap); 