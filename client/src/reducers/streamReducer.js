import {
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types';
import _ from 'lodash';

export default (state = {}, action ) => {
    switch (action.type) {
        case FETCH_STREAMS:
        //mapKeys from lodash changes an array (first param) to an object with the key being the 2nd param ('id')
            // return { ...state, ..._.mapKeys(action.payload, 'id')};
        //this is a non-lodash solution but it doesn't initially set the streams object in state
            const newObj = {};
            action.payload.forEach( (item) => newObj[item.id] = item);
            return { ...state, ...newObj };
        //another way, but this does set the streams state
        //.reduce iterates over every element of an array and executes a user-definted reducer
        //function (starting from "(newstate, bla)") that runs on every element of the array
        // I changed to accumulator and currentValue, they were originally newState and stream
        //READ MORE HERE https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
            // return {
            //     ...state,
            //     ...action.payload.reduce((accumulator, currentValue) => {
            //         accumulator[currentValue.id] = currentValue;
            //         return accumulator;
            //     }, {})
            // }
        case FETCH_STREAM:
        //This is key interpolation syntax, like saying animalSounds = {dog: 'bark', cat: 'meow'};
        //animal = 'lion', sound = 'roar', {...animalSounds, [animal]: sound} will create {dog: 'bark', cat: 'meow', lion: 'roar'};
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}