import axios from 'axios';
const URL_BACK = process.env.REACT_APP_BACK_URL || "http://localhost:3001";

const axiosInstance = axios.create({
    baseURL: URL_BACK,
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error('Error en la respuesta de Axios:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;