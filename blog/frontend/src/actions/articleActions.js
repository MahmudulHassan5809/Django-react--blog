import axios from 'axios';
import { createMessage,returnErrors } from './messageActions';
import { tokenConfig } from './authActions'

import {
    GET_ARTICLES,
    ADD_ARTICLE,
    DELETE_ARTICLE,
    GET_ARTICLES_BY_USER,
    GET_ARTICLES_BY_ID,
    GET_ERRORS
} from './types.js';

// GET ALL Articles
export const getArticles = (page_number=null) => (dispatch,getState) => {
    let page;
    if(page_number){
        page = page_number;
    }else{
        page = 1;
    }
    axios.get(`/api/articles/?page=${page}`,tokenConfig(getState))
        .then(res => {
            const pagination = {
                count: res.data.count,
                next: res.data.next,
                prev: res.data.previous
            }

            dispatch({
                type: GET_ARTICLES,
                payload : {
                    articles : res.data.results,
                    pagination: pagination
                }
            })
        })
        .catch(err => {
            console.log(err.response.data)
            dispatch(returnErrors(err.response.data,err.response.status))
        });
}

// GET Articles By User
export const getUserArticles = (user_id) => (dispatch,getState) => {
    axios.get(`/api/articles/${user_id}`)
        .then(res => {
            dispatch({
                type: GET_ARTICLES_BY_USER,
                payload : res.data
            })
        })
        .catch(err => {
            console.log(err.response.data)
            dispatch(returnErrors(err.response.data,err.response.status))
        });
}

// GET Articles By ID
export const getArticleById = (article_id) => (dispatch,getState) => {
    axios.get(`api/article/byid/${article_id}`)
        .then(res => {
            dispatch({
                type: GET_ARTICLES_BY_ID,
                payload : res.data
            })
        })
        .catch(err => {
            console.log(err.response.data)
            dispatch(returnErrors(err.response.data,err.response.status))
        });
}


// ADD  Article
export const addArticle = (article) => (dispatch,getState) => {

    axios.post('/api/articles/create/',article,tokenConfig(getState),{
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    .then(res => {
        dispatch(createMessage({articleAdded: 'Article Added'}));
        dispatch({
            type: ADD_ARTICLE,
            payload : res.data
        })
    })
    .catch(err => dispatch(returnErrors(err.response.data,err.response.status)));
}


// Delete Article
export const deleteArticle = (article_id) => (dispatch,getState) => {

    axios.delete(`/api/article/delete/${article_id}`,tokenConfig(getState))
    .then(res => {
        dispatch(createMessage({articleDeleted: 'Article Deleted'}));
        dispatch({
            type: DELETE_ARTICLE,
            payload: article_id
        })
    })
    .catch(err => dispatch(returnErrors(err.response.data,err.response.status)));
}
