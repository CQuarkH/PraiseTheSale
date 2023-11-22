import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextButton from "../../../components/common/TextButton";
import CloseIcon from "@mui/icons-material/Close";
import { complaintStatus } from "../../../utils/ComplaintStatus";
import { useForm } from "react-hook-form";
import CustomInput from "../../../components/common/CustomInput";
import { toast } from "react-toastify";
import { useComplaints } from "../../../context/ComplaintContext";
import AsyncButton from "../../../components/common/AsyncButton";

const RESOLUTION_DETAILS_RULES = {
  required: "Resolution details are required",
  minLength: {
    value: 10,
    message: "Must be at least 10 characters",
  },
};

const baseButtonStyle = {
  marginTop: "10px",
};

function UpdateComplaintCard({ complaint, layoutID, onClose }) {
  const [selectedStatus, setSelectedStatus] = useState(
    complaint.complaintStatus
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { updateComplaint } = useComplaints();

  const handleResolveComplaint = async (data) => {
    try {
      await updateComplaint(
        {
          complaintId: complaint.id,
          resolutionDetails: data.resolutionDetails,
        },
        true
      );

      toast.success("Complaint resolved succesfully!");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error resolving complaint! " + error.response.data);
    }
  };

  const handleUpdateComplaintStatus = async () => {
    try {
      await updateComplaint({
        complaintId: complaint.id,
        complaintStatus: selectedStatus,
      });

      toast.success("Complaint updated succesfully!");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error updating complaint! " + error.response.data);
    }
  };

  const handleUpdateOrResolveComplaint = () => {
    if (selectedStatus === "RESOLVED") {
      handleSubmit(handleResolveComplaint)();
    } else {
      handleUpdateComplaintStatus(selectedStatus);
    }
  };

  return (
    <div className="profile-overlay">
      <motion.div className="dialog-card" layoutId={layoutID}>
        <div className="flex-aligned-container">
          <motion.div onClick={onClose}>
            <CloseIcon />
          </motion.div>
          <h3>Choose a Complaint Status</h3>
          <AsyncButton
            style={{ width: "100px", height: "50px" }}
            text="Save"
            asyncOnClick={handleUpdateOrResolveComplaint}
          />
        </div>
        <div className="divider-horizontal" />
        <div className="block-tile ml-0" style={{ flexDirection: "row" }}>
          <motion.div className="block-tile ml-0" style={{ padding: "10px" }}>
            {complaintStatus.map((status) => (
              <TextButton
                text={status}
                style={{
                  ...baseButtonStyle,
                  ...(selectedStatus !== status && {
                    backgroundColor: "#4B507A",
                  }),
                  ...(selectedStatus !== "RESOLVED" && { width: "auto" }),
                }}
                onClick={() => {
                  setSelectedStatus(status);
                }}
              />
            ))}
          </motion.div>
          {selectedStatus === "RESOLVED" && (
            <AnimatePresence>
              <motion.div
                className="block-tile ml-0"
                style={{ padding: "10px" }}
              >
                <div className="flex-aligned-container">
                  <h4>Resolution Details</h4>
                </div>
                <CustomInput
                  control={control}
                  isTextarea={true}
                  rules={RESOLUTION_DETAILS_RULES}
                  error={errors.resolutionDetails}
                  name="resolutionDetails"
                  placeholder="Write the resolution of the complaint."
                  style={{ height: "100%" }}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default UpdateComplaintCard;
