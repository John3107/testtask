import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://frontend-test-assignment-api.abz.agency/api/v1/'
})


export const testAssignmentAPI = {
    getToken() {
        return instance.get('token');
    },
    getUsers(numUsers) {
        return instance.get(`users?page=1&count=${numUsers}`);
    },
    setUsers(userData) {
        return instance.post('users', {userData});
    },
}