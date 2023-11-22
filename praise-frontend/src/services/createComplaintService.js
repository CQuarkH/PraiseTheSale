
export const createComplaintService = async (axiosInstance, complaintData) => {
  try {

    const response = await axiosInstance.post('/complaints', complaintData);
    console.log("Complaint Created! " + complaintData);
    return response.data;

  } catch (error) {
    console.error("API Error: ", error.response);
    throw error;
  }
}
