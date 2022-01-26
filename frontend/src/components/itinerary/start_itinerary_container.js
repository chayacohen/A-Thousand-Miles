import { connect } from "react-redux";
import StartItinerary from './start_itinerary'; 
import { createItinerary } from "../../actions/itinerary_actions";


const mapStateToProps = (state) => ({
    currentUser: state.session.user.id
})

const mapDispatchToProps = (dispatch) => ({
    createItinerary: (data) => dispatch(createItinerary(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(StartItinerary); 