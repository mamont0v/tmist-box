import $api from '../http/http.axios.js';

export default class AuthService {
    static async login(email, password) {
        return $api.post('/login', { email, password })
    }

    static async signup(email, password) {
        return $api.post('/signup', { email, password })
    }

    static async logout(email, password) {
        return $api.post('/logout', { email, password })
    }
}