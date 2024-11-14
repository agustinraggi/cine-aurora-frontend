import axios from 'axios';

// Configuración de la URL base
const URL_BACK = process.env.REACT_APP_BACK_URL || "http://localhost:3001";

const TOKEN_KEY = 'token';

// Crear instancia de Axios con baseURL
const axiosInstance = axios.create({
    baseURL: URL_BACK,
});

// Función para establecer el token en localStorage
export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

// Función para obtener el token de localStorage
export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

// Función para eliminar el token de localStorage
export function deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
}

// Configurar interceptores de solicitud y respuesta en la instancia de Axios
export function initAxiosInterceptors() {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            console.error('Error en la respuesta de Axios:', error);
            if (error.response && error.response.status === 401) {
                deleteToken();
            }
            return Promise.reject(error);
        }
    );
}


// Inicializar los interceptores cuando se importe el archivo
initAxiosInterceptors();

export default axiosInstance;
