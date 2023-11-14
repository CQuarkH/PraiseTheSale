
export const createComplaint = async (axiosInstance, complaintData) => {
  try {

    const response = await axiosInstance.post('/complaints', complaintData);
    return response.data;

  } catch (error) {
    console.error("API Error: ", error.response);
    throw error;
  }
}
