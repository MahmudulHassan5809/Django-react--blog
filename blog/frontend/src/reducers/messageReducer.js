import {
    CREATE_MESSAGE
} from '../actions/types.js';

const initialState = {}

export default function(state = initialState,action){
    switch (action.type) {
        case CREATE_MESSAGE:
            return (state = action.payload)
            break;
        default:
            return state
            break;
    }
}
