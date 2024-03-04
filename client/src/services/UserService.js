import $api from '../http/http.axios.js';

export default class AuthService {
    static async fetchUsers() {
        return $api.get('/users', { email, password })
    }
}