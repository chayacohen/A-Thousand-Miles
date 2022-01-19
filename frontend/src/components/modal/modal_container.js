import { connect } from 'react-redux';
import { inactiveModal } from '../../actions/modal_actions';
import Modal from './modal';

const mSTP = state => {
    return {
      modal: state.modal
    };
  };
  
  const mDTP = dispatch => {
    return {
        inactiveModal: () => dispatch(inactiveModal())
    };
  };
  
  export default connect(mSTP, mDTP)(Modal);