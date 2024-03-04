import * as types from './equipments.types'
import axios from 'axios'
import {API_URL} from './../../constants';

export const getEquipments = () => async (dispatch) => {
    try {
        dispatch({
            type: types.EQUIPMENTS_TABLE_REQUEST
        })

        const { data } = await axios.get(`${API_URL}/equipments`)
        dispatch(
            {
                type: types.EQUIPMENTS_TABLE_LOAD_SUCCESS,
                payload: data
            })
    } catch (error) {
        dispatch({
            type: types.EQUIPMENTS_TABLE_FAILED,
            dispatch: error.response
        })
    }
}


export const deleteEquipments = (id) => async (dispatch) => {
    try {
        dispatch({
            type: types.EQUIPMENTS_TABLE_REQUEST
        })
        await axios.delete(`${API_URL}/equipments/${id}`)
        dispatch(
            {
                type: types.EQUIPMENTS_TABLE_DELETE_SUCCESS,
                payload: id
            })
    } catch (error) {
        dispatch({
            type: types.EQUIPMENTS_TABLE_FAILED,
            dispatch: error.response
        })
    }
}

export const addEquipments = (person) => async (dispatch) => {
    try {
        dispatch({
            type: types.EQUIPMENTS_TABLE_REQUEST
        })
        const { data } = await axios.post(`${API_URL}/equipments/`, person)

        dispatch(
            {
                type: types.EQUIPMENTS_TABLE_ADD_SUCCESS,
                payload: data
            })
    } catch (error) {
        dispatch({
            type: types.EQUIPMENTS_TABLE_FAILED,
            dispatch: error.response
        })
    }
}


export const updateEquipments = (id, updateData) => async (dispatch) => {
    try {
        dispatch({
            type: types.EQUIPMENTS_TABLE_REQUEST
        })
        const { data } = await axios.patch(`${API_URL}/equipments/${id}`, updateData)

        dispatch(
            {
                type: types.EQUIPMENTS_TABLE_UPDATE_SUCCESS,
                payload: data
            })
    } catch (error) {
        dispatch({
            type: types.EQUIPMENTS_TABLE_FAILED,
            dispatch: error.response
        })
    }
}