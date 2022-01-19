import { ACTIVE_MODAL, INACTIVE_MODAL } from "../actions/modal_actions";


const modalReducer = (state=null, action) => {
    Object.freeze(state);

    switch (action.type) {
        case ACTIVE_MODAL:
            return action.modal;
    
        case INACTIVE_MODAL:
            return null;
    
        default:
            return state;
    }
}
export default modalReducer;