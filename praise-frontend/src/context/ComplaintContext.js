import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useAxios } from "../api/useAxios";
import { createComplaintService } from "../services/createComplaintService";
import { useAuth } from "./AuthContext";

const ComplaintContext = createContext();

export const useComplaints = () => useContext(ComplaintContext);

export const ComplaintsProvider = ({ children }) => {
  const [complaints, setComplaints] = useState([]);
  const axiosInstance = useAxios();
  const { authData } = useAuth();

  useEffect(() => {
    if (!authData.token) {
      clearComplaints();
    }
  }, [authData.token]);

  const clearComplaints = () => {
    setComplaints([]);
  };

  const fetchComplaints = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/complaints");
      console.log(response.data.complaints);
      setComplaints(response.data.complaints);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  }, [axiosInstance]);

  const createComplaint = async (complaintData) => {
    try {
      const response = await createComplaintService(
        axiosInstance,
        complaintData
      );
      setComplaints((prevComplaints) => [response, ...prevComplaints]);
    } catch (error) {
      console.error("Error creating or updating complaint:", error);
      throw error;
    }
  };

  const deleteComplaint = async (complaintId) => {
    try {
      await axiosInstance.delete(`/complaints/${complaintId}`);
      setComplaints((prevComplaints) =>
        prevComplaints.filter((complaint) => complaint.id !== complaintId)
      );
    } catch (error) {
      console.error("Error deleting complaint:", error);
      throw error;
    }
  };

  const updateComplaint = async (updatedComplaint, resolved = false) => {
    try {
      const apiUrl = resolved
        ? `/complaints/${updatedComplaint.complaintId}/resolve`
        : `/complaints/${updatedComplaint.complaintId}`;

      const response = await axiosInstance.put(apiUrl, updatedComplaint);
      const updatedComplaintFromServer = response.data;

      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint.id === updatedComplaintFromServer.id
            ? updatedComplaintFromServer
            : complaint
        )
      );
    } catch (error) {
      console.error("Error updating complaint: ", error);
      throw error;
    }
  };

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        fetchComplaints,
        createComplaint,
        deleteComplaint,
        updateComplaint,
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
};

export default ComplaintsProvider;
