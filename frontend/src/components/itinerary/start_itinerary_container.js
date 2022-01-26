import { connect } from "react-redux";
import StartItinerary from './start_itinerary'; 
import { receiveDescription, receiveTitle } from "../../actions/itinerary_form_actions";
import { createItinerary } from "../../actions/itinerary_actions";


const mapStateToProps = (state) => ({
    currentUser: state.session.user.id
})

const mapDispatchToProps = (dispatch) => ({
    receiveDescription: (description) => dispatch(receiveDescription(description)), 
    receiveTitle: (title) => dispatch(receiveTitle(title)), 
    createItinerary: (data) => dispatch(createItinerary(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(StartItinerary); 