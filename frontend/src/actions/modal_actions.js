export const ACTIVE_MODAL = "ACTIVE_MODAL"; 
export const INACTIVE_MODAL = "INACTIVE_MODAL"; 


export const activeModal = (modal) => ({
    type: ACTIVE_MODAL, 
    modal
});

export const inactiveModal = () => ({
    type: INACTIVE_MODAL
});