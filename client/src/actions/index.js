import streams from '../apis/streams';
import { SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS,
    DELETE_STREAM,
    EDIT_STREAM } from './types';

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
    return async (dispatch, getState) => {
        //adding Gauth userid info from getState
        const { userId } = getState().auth;
        const response = await streams.post('/streams', { ...formValues, userId });

        dispatch({ type: CREATE_STREAM, payload: response.data });

        //programmatic navigation to send user back to main page after they submit new stream

    };
}

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');

    dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.put(`/streams/${id}`, formValues);

    dispatch({ type: EDIT_STREAM, payload: response.data });
};

export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });
};