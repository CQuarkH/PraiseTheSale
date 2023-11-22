import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export const useAxios = (path) => {
    const { authData } = useAuth();

    const axiosInstance = axios.create({
        baseURL: `http://localhost:8080/api/${ path ?? authData?.role?.toLowerCase() ?? 'buyer'}`,
    });

    axiosInstance.interceptors.request.use(config => {
        if (authData.token) {
            config.headers['Authorization'] = `Bearer ${authData.token}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    return axiosInstance;
};
