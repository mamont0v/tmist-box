import axios from 'axios';
import {API_URL} from './../../constants';
import * as types from './activities.types.js';


export const getActivities = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${API_URL}/activities`)
        dispatch({
            type: types.ACTIVITIES_TABLE_LOAD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: types.ACTIVITIES_TABLE_FAILED,
            dispatch: error.response
        })
    }
}


export const deleteActivities = (id) => async (dispatch) => {
    try {

        await axios.delete(`${API_URL}/activities/${id}`)
        dispatch({
            type: types.ACTIVITIES_TABLE_DELETE_SUCCESS,
            payload: id
        })
    } catch (error) {
        dispatch({
            type: types.ACTIVITIES_TABLE_FAILED,
            dispatch: error.response
        })
    }
}

export const addActivities = (person) => async (dispatch) => {
    try {

        const { data } = await axios.post(`${API_URL}/activities/`, person)

        dispatch({
            type: types.ACTIVITIES_TABLE_ADD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: types.ACTIVITIES_TABLE_FAILED,
            dispatch: error.response
        })
    }
}


export const updateActivities = (id, updateActivity) => async (dispatch) => {
    try {

        const { data } = await axios.patch(`${API_URL}/activities/${id}`, updateActivity)

        dispatch({
            type: types.ACTIVITIES_TABLE_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: types.ACTIVITIES_TABLE_FAILED,
            dispatch: error.response
        })
    }
}