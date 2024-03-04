import * as types from './itAssets.types'
import axios from 'axios'
import {API_URL} from './../../constants';

//load
export const getAssets = () => async (dispatch) => {
    try {
        dispatch({
            type: types.IT_ASSETS_REQUEST,
        })

        const { data } = await axios.get(`${API_URL}/itAssets`)

        dispatch({
            type: types.IT_ASSETS_TABLE_LOAD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: types.IT_ASSETS_TABLE_FAILED,
            dispatch: error.response
        })
    }
}

//delete
export const deleteAssets = (id) => async (dispatch) => {
    try {
        dispatch({
            type: types.IT_ASSETS_REQUEST,
        })
        await axios.delete(`${API_URL}/itAssets/${id}`)

        dispatch({
            type: types.IT_ASSETS_TABLE_DELETE_SUCCESS,
            payload: id
        })
    } catch (error) {
        dispatch({
            type: types.IT_ASSETS_TABLE_FAILED,
            dispatch: error.response
        })
    }
}

//add
export const addAssets = (asset) => async (dispatch) => {
    try {
        dispatch({
            type: types.IT_ASSETS_REQUEST,
        })
        const { data } = await axios.post(`${API_URL}/itAssets/`, asset)

        dispatch({
            type: types.IT_ASSETS_TABLE_ADD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: types.IT_ASSETS_TABLE_FAILED,
            dispatch: error.response
        })
    }
}

//update
export const updateAssets = (id, asset) => async (dispatch) => {
    try {
        dispatch({
            type: types.IT_ASSETS_REQUEST,
        })
        const { data } = await axios.patch(`${API_URL}/itAssets/${id}`, asset)

        dispatch({
            type: types.IT_ASSETS_TABLE_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: types.IT_ASSETS_TABLE_FAILED,
            dispatch: error.response
        })
    }
}