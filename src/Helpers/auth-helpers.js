import Axios from 'axios';

const TOKEN_KEY = 'token';

export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function initAxiosInterceptors() {
    Axios.interceptors.request.use(function(config) {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function(error) {
        return Promise.reject(error);
    });

    Axios.interceptors.response.use(function(response) {
        return response;
    }, function(error) {
        if (error.response && error.response.status === 401) {
        }
        return Promise.reject(error);
    });
}
