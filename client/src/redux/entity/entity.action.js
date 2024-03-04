import * as types from './entity.types'
import axios from 'axios'
import {API_URL} from './../../constants';

export const getEntity = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${API_URL}/company`)
        dispatch(
            {
                type: types.ENTITY_TABLE_LOAD_SUCCESS,
                payload: data
            })
    } catch (error) {
        dispatch({
            type: types.ENTITY_TABLE_FAILED,
            dispatch: error.response
        })
    }
}


export const deleteEntity = (id) => async (dispatch) => {
    try {

        await axios.delete(`${API_URL}/company/${id}`)
        dispatch(
            {
                type: types.ENTITY_TABLE_DELETE_SUCCESS,
                payload: id
            })
    } catch (error) {
        dispatch({
            type: types.ENTITY_TABLE_FAILED,
            dispatch: error.response
        })
    }
}

export const addEntity = (person) => async (dispatch) => {
    try {

        const {data} = await axios.post(`${API_URL}/company/`, person)

        dispatch(
            {
                type: types.ENTITY_TABLE_ADD_SUCCESS,
                payload: data
            })
    } catch (error) {
        dispatch({
            type: types.ENTITY_TABLE_FAILED,
            dispatch: error.response
        })
    }
}


export const updateEntity = (id, updatePerson) => async (dispatch) => {
    try {

        const { data } = await axios.patch(`${API_URL}/company/${id}`, updatePerson)

        dispatch(
            {
                type: types.ENTITY_TABLE_UPDATE_SUCCESS,
                payload: data
            })
    } catch (error) {
        dispatch({
            type: types.ENTITY_TABLE_FAILED,
            dispatch: error.response
        })
    }
}