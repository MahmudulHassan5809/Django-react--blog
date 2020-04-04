import axios from 'axios';
import { returnErrors } from './messageActions';

import {
    GET_CATEGORY_ARTICLES,
    GET_CATEGORIES
} from './types.js';

// GET ALL Articles
export const getCategories = () => (dispatch) => {

    axios.get(`/api/categories/`)
        .then(res => {
            dispatch({
                type: GET_CATEGORIES,
                payload : res.data
            })
        })
        .catch(err => {

            dispatch(returnErrors(err.response.data,err.response.status))
        });
}



// GET Articles By Category
export const getArticlesByCategory = (categoryId) => (dispatch) => {

    axios.get(`/api/category/articles/${categoryId}`)
        .then(res => {

            dispatch({
                type: GET_CATEGORY_ARTICLES,
                payload : res.data
            })
        })
        .catch(err => {

            dispatch(returnErrors(err.response.data,err.response.status))
        });
}
