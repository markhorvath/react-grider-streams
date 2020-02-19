import streams from '../apis/streams';
import { SIGN_IN, SIGN_OUT, CREATE_STREAM } from './types';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

// export const createStream = formValues => async dispatch => {
//     streams.post('/streams', formValues);
// } THIS IS JUST THE SHORTER VERSION

//formValues are the list of all the values we listed into our createStream Form as an argument
export const createStream = (formValues) => {
    //we're making an asynchronous action creator, so we're using redux-thunk
    return async (dispatch) => {
        const response = await streams.post('/streams', formValues);

        dispatch({ type: CREATE_STREAM, payload: response.data });
    };
}