import { connect } from "react-redux";
import StartItinerary from './start_itinerary'; 

const mapStateToProps = (state) => ({
    currentUser: state.session.user.id
})

// const mapDispatchToProps = (dispatch) => ({

// })

export default connect(mapStateToProps)(StartItinerary); 