import streams from '../apis/streams';

export const signIn = (userId) => {
    return {
        type: 'SIGN_IN',
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    };
};

// export const createStream = formValues => async dispatch => {
//     streams.post('/streams', formValues);
// } THIS IS JUST THE SHORTER VERSION

//formValues are the list of all the values we listed into our createStream Form as an argument
export const createStream = (formValues) => {
    //we're making an asynchronous action creator, so we're using redux-thunk
    return async (dispatch) => {
        streams.post('/streams', formValues);
    };
}