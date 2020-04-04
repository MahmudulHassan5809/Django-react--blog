import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    MY_POSTS
} from './types';

import axios from 'axios';
import { returnErrors } from './messageActions'


// Check Token & Load User
export const loadUser = () => (dispatch,getState) => {
    // User Loadin
    dispatch({type: USER_LOADING})

    axios.get('/api/auth/user',tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
           dispatch(returnErrors(err.response.data,err.response.status))
           dispatch({
                type: AUTH_ERROR
           })
        })
}


// Login User
export const login = (username,password) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }


    // Request Body
    const body = JSON.stringify({username,password})

    axios.post('/api/auth/login',body,config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data,err.response.status))
            dispatch({
                type: LOGIN_FAIL
            })
        })
}


// Register User
export const register = ({username,password,email}) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }


    // Request Body
    const body = JSON.stringify({username,password,email})

    axios.post('/api/auth/register',body,config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data,err.response.status))
            dispatch({
                type: REGISTER_FAIL
            })
        })
}


// Lgout User
export const logout = () => (dispatch,getState) => {


    axios.post('/api/auth/logout',null,tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS,
            })
        })
        .catch(err => {
           dispatch(returnErrors(err.response.data,err.response.status))
        })
}


// User Dashboard
export const myPosts = () => (dispatch,getState) => {
    axios.get('/api/auth/dashboard',tokenConfig(getState))
        .then(res => {

            dispatch({
                type: MY_POSTS,
                payload: res.data
            })
        })
        .catch(err => {

           dispatch(returnErrors(err.response.data,err.response.status))
        })
}


// Setup Config With Token -- helper function
export const tokenConfig = getState => {
    // get Token From State
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    // If Token, Add To Headers Config
    if(token){
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
}
