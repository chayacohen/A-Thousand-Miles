import { connect } from "react-redux";
import EnterAddress from "./enter_address";
import { receiveStartingAddress , receiveEndAddress } from "../../actions/itinerary_form_actions";

const mapStateToProps = (state) => ({
    // address: state.currentUser.address, 
    // lat: state.currentUser.lat, 
    // lng: state.currentUser.lng
    startAddress: state.ui.starting,
    endAddress: state.ui.ending
})

const mapDispatchToProps = (dispatch) => ({
    receiveStartingAddress: (address) => dispatch(receiveStartingAddress(address)), 
    receiveEndAddress: (address) => dispatch(receiveEndAddress(address))
})



export default connect(mapStateToProps, mapDispatchToProps)(EnterAddress); 