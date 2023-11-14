import { uploadImageService } from './uploadImageService';

const updateOrCreateProductService = async (axiosInstance, productData, fileSelect) => {
    try {
        let uploadProductData = { ...productData };

        if (fileSelect && productData.productImage) {
            const imageLink = await uploadImageService(productData.productImage, null, 'products');
            uploadProductData = { ...uploadProductData, imageLink };
        }

        let response;
        if (uploadProductData.id) {
            response = await axiosInstance.put(`/products/${uploadProductData.id}`, uploadProductData);
        } else {
            response = await axiosInstance.post('/products', uploadProductData);
        }

        return response.data;

    } catch (error) {
        console.error("API Error: ", error.response);
        throw error;
    }
};

export default updateOrCreateProductService;
