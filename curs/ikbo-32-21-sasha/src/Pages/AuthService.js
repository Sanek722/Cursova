import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const API_URL = 'http://localhost:8082/auth/';
class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + 'login', { username, password })
            .then(response => {
                if (response.data.token) {
                    const decodedToken = jwtDecode(response.data.token);
                    const user = {
                        ...response.data,
                        role: decodedToken.role // предположим, что роль хранится в токене как 'role'
                    };
                    localStorage.setItem('user', JSON.stringify(user));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(username, role, password) {    
        return axios.post(API_URL + 'register', {
            username,
            password,
            role
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();
