import {
    GET_CATEGORIES,

} from '../actions/types.js';

const initialState = {
    categories: [],
}

export default function(state = initialState,action){
    switch (action.type) {
        case GET_CATEGORIES:
            return{
                ...state,
                categories: action.payload,
            }
            break;
        default:
            return state
            break;
    }
}
