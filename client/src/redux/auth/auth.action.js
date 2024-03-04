import * as types from './auth.types'
import axios from 'axios'
import $api from '../../http/http.axios.js'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: types.LOGIN_REQUEST
        })

        const response = await $api.post('/users/login', { email, password })

        localStorage.setItem('token', response.data.accessToken)

        dispatch(
            {
                type: types.LOGIN_SUCCESS,
                payload: response.data.user
            })

    } catch (error) {
        console.log(error)
        dispatch({
            type: types.LOGIN_FAILED,

        })
    }
}


export const signup = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: types.SIGN_UP_REQUEST
        })

        const response = await $api.post('/users/signup', { email, password })

        localStorage.setItem('token', response.data.accessToken)

        dispatch(
            {
                type: types.SIGN_UP_SUCCESS,
                payload: response.data.user
            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: types.SIGN_UP_FAILED,

        })
    }
}

export const logout = () => async (dispatch) => {
    try {
        dispatch({
            type: types.LOGOUT_REQUEST
        })

        await $api.post('/users/logout')

        localStorage.removeItem('token')

        dispatch(
            {
                type: types.LOGOUT_SUCCESS,

            })
    } catch (error) {
        console.log(error)
        dispatch({
            type: types.LOGOUT_FAILED,

        })
    }
}

export const checkAuth = () => async (dispatch) => {
    try {
        dispatch({
            type: types.CHECK_AUTH_REQUEST
        })

        // может вернуться 401 и поэтому нужна использовать обычный axios чтобы выдать заново рефреш токены
        const response = await axios.get('/api/v1/users/refresh', { withCredentials: true })
        localStorage.setItem('token', response.data.accessToken)

        dispatch({
            type: types.CHECK_AUTH_SUCCESS,
            payload: response
        })
    } catch (error) {
        dispatch({
            type: types.CHECK_AUTH_FAILED,
            payload: error.response
        })
    }
}


export const getUsers = () => async (dispatch) => {
    try {
        const response = await $api.get('/users')

        dispatch({
            type: types.GET_USERS_SUCCESS,
            payload: response.data
        })

    } catch (err) {

    }
}
