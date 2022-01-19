import {
    RECEIVE_CURRENT_USER,
    RECEIVE_USER_LOGOUT,
} from '../actions/session_actions';

import { RECEIVE_USER } from '../actions/user_actions'

const UsersReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return {
                [action.currentUser.id]: action.currentUser
            }
        case RECEIVE_USER:
            return {
                [action.user.data._id]: action.user.data
            }
        case RECEIVE_USER_LOGOUT:
            return {};
        default:
            return state;
    }
};
export default UsersReducer