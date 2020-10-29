import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

/**
 * REMEMBER: any time we want to communicate something to the backend API, we're always gonna make that request inside an action creator
 */

export const fetchUser = () => async dispatch => {
    /**
     * Directly return an action (no use of redux-thunk)
     */
    // const request = axios.get('/api/current_user');
    // return {
    //     type: FETCH_USER,
    //     payload: request
    // }

    /**
     * The purpose of Redux Thunk middleware is to inspect whatever value we return from the action creator
     * If redux-thunk sees that we return a function instead of a normal action, it will automatically call 
     * this function and pass in the dispatch function as an argument
     */
    const response = await axios.get('/api/current_user');
    dispatch({
        type: FETCH_USER,
        payload: response.data
    });
};


export const handleToken = token => async dispatch => {
    const response = await axios.post('/api/stripe', token);
    console.log("RESPONSE: ", response);
    /** update and get back the updated user model */
    dispatch({ type: FETCH_USER, payload: response.data });
};

export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);

    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data });
};


export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

