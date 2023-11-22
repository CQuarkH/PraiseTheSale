import { uploadImageService } from "./uploadImageService";

export const updateUserProfile = async (axiosInstance, profileData, role) => {
    try {
        const endpoint = role === 'SELLER' ? '/seller-profile' : '/profile';
        const response = await axiosInstance.put(endpoint, profileData);
        return response.data;

    } catch (error){
        console.error("API Error: ", error.response);
        throw error;
    }
}