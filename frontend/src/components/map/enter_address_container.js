import { connect } from "react-redux";
import EnterAddress from "./enter_address";
import { getUser} from '../../actions/user_actions';
import { receiveStartingAddress , receiveEndAddress, clearItineraryForm } from "../../actions/itinerary_form_actions";
import { createItinerary, getItinerary } from "../../actions/itinerary_actions";


const mapStateToProps = (state) => ({
    // address: state.currentUser.address, 
    // lat: state.currentUser.lat, 
    // lng: state.currentUser.lng
    startAddress: state.ui.starting,
    endAddress: state.ui.ending, 
    currentUser: state.session.user,
    title: state.ui.title, 
    description: state.ui.description

})

const mapDispatchToProps = (dispatch) => ({
    receiveStartingAddress: (address) => dispatch(receiveStartingAddress(address)), 
    receiveEndAddress: (address) => dispatch(receiveEndAddress(address)), 
    createItinerary: (itinerary) => dispatch(createItinerary(itinerary)), 
    clearItineraryForm: () => dispatch(clearItineraryForm()), 
    getItinerary: (itineraryId) => dispatch(getItinerary(itineraryId)), 
    getUser: (userId) => dispatch(getUser(userId))
})



export default connect(mapStateToProps, mapDispatchToProps)(EnterAddress); 