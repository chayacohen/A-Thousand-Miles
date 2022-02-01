import { connect } from "react-redux";
import EnterAddress from "./enter_address";
import { getUser} from '../../actions/user_actions';
import { createItinerary, getItinerary, editItinerary } from "../../actions/itinerary_actions";


const mapStateToProps = (state, ownProps) => {
    debugger 
    return ({
        currentUser: state.entities.user[state.session.user.id],
        currentUserId: state.session.user.id,
        itinerary: state.entities.itineraries[ownProps.match.params.itineraryId]
    })
}

const mapDispatchToProps = (dispatch) => ({ 
    createItinerary: (itinerary) => dispatch(createItinerary(itinerary)), 
    getItinerary: (itineraryId) => dispatch(getItinerary(itineraryId)), 
    getUser: (userId) => dispatch(getUser(userId)), 
    editItinerary: (id, data) => dispatch(editItinerary(id, data))
})



export default connect(mapStateToProps, mapDispatchToProps)(EnterAddress); 