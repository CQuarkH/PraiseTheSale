import { uploadImageService } from "./uploadImageService";

export const updateUserProfile = async (axiosInstance, profileData) => {
    try {
        const response = await axiosInstance.put('/profile', profileData);
        return response.data;

    } catch (error){
        console.error("API Error: ", error.response);
        throw error;
    }
}