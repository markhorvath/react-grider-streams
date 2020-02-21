import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; //chap19-229, required to wire to the key 'form'
//we call it formReducer just to avoid confusion
import authReducer from './authReducer';
import streamReducer from './streamReducer';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamReducer
});