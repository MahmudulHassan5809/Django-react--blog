import {
    GET_ARTICLES,
    DELETE_ARTICLE,
    GET_ARTICLES_BY_USER,
    GET_ARTICLES_BY_ID,
    GET_CATEGORY_ARTICLES
} from '../actions/types.js';

const initialState = {
    articles: [],
    article: {},
    pagination: {}
}

export default function(state = initialState,action){
    switch (action.type) {
        case GET_ARTICLES:
            return{
                ...state,
                articles: action.payload.articles,
                pagination: action.payload.pagination
            }
            break;
        case GET_CATEGORY_ARTICLES:
            return{
                ...state,
                articles: action.payload,
                pagination: {},
                article: {}
            }
            break;
        case GET_ARTICLES_BY_ID:
            return{
                ...state,
                articles : [],
                article: action.payload,
                pagination: {}
            }
            break;
        case GET_ARTICLES_BY_USER:
            return{
                ...state,
                articles: action.payload,
                pagination: {}
            }
            break;
        case DELETE_ARTICLE:
            return{
                ...state,
                articles: state.articles.filter(article => article.id !== action.payload)
            }
            break;
        default:
            return state
            break;
    }
}
