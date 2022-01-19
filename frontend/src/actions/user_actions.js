import * as UserApiUtil from '../util/user_api_util';

export const RECEIVE_USER = "RECEIVE_USER";

export const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

export const editUser = (id, data) => dispatch => (
    UserApiUtil.editUser(id, data)
        .then(user => (dispatch(receiveUser(user))))
);