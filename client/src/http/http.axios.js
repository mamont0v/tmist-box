import axios from 'axios'
import * as constants from '../constants'

//Authorization: Bearer <token>
const $api = axios.create({
    // чтобы к каждому запросу кука цеплялась автоматически
    withCredentials: true, 
    baseURL: constants.SERVER_URL
})

//Axios interceptors are functions that Axios calls for every request.

$api.interceptors.request.use(config => {

    const token = localStorage.getItem('token');
    const isAuth = token ? `Bearer ${token}` : null;

    config.headers = {
        'Authorization': isAuth,
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded'
    }
    console.log('config::', config)
    return config
},
    error => Promise.reject(error),
)

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${constants.SERVER_URL}/api/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})



export default $api