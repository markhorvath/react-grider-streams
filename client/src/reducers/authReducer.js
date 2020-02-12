//this is in caps to let other engineers know it's a true constant and should never be modified
const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SIGN_IN':
        //usually rules about not directly manipulating state
            return { ...state, isSignedIn: true, userId: action.payload };
        case 'SIGN_OUT':
            return { ...state, isSignedIn: false, userId: null };
        default:
            return state;
    }
}