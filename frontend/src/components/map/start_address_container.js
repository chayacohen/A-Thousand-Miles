import { connect } from "react-redux";
import StartAddress from "./start_address";

const mapStateToProps = (state) => ({
    address: state.currentUser.address, 
    lat: state.currentUser.lat, 
    lng: state.currentUser.lng
})

export default connect(mapStateToProps)(StartAddress); 