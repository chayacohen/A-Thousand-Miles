import { connect } from "react-redux";
import StartItinerary from './start_itinerary'; 
import { receiveDescription, receiveTitle } from "../../actions/itinerary_form_actions";


const mapStateToProps = (state) => ({
    currentUser: state.session.user.id
})

const mapDispatchToProps = (dispatch) => ({
    receiveDescription: (description) => dispatch(receiveDescription(description)), 
    receiveTitle: (title) => dispatch(receiveTitle(title))
})

export default connect(mapStateToProps, mapDispatchToProps)(StartItinerary); 