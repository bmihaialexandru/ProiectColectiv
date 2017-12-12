import axios from 'axios';

export const login = (username, password) => {
    return axios.post('http://www.localhost:8090/ServerApp/interface/login.php', {
        username: username,
        password: password
    });
}