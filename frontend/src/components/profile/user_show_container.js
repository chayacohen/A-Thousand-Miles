import { connect } from 'react-redux';
import { editUser } from '../../actions/user_actions';
import { login } from '../../actions/session_actions';
import UserShow from './user_show';

const mSTP = (state) => {
    // debugger
  return {
    currentUser: state.session.user,
    user: Object.values(state.entities.user),
    errors: state.errors.session
  };
};

const mDTP = dispatch => {
  return {
    editUser: (id, data) => dispatch(editUser(id, data)),
    login: user => dispatch(login(user))
  };
};

export default connect(mSTP, mDTP)(UserShow);