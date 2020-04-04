import {
    GET_ERRORS
} from '../actions/types.js';

const initialState = {
    msg: {},
    status: null
}

export default function(state = initialState,action){
    switch (action.type) {
        case GET_ERRORS:
            return{
                msg: action.payload.msg,
                status: action.payload.status
            }
            break;
        default:
            return state
            break;
    }
}
