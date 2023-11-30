import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import CustomInput from "../common/CustomInput";
import TextButton from "../common/TextButton";
import CloseIcon from "@mui/icons-material/Close";
import AnimatedButton from "../common/AnimatedButton";
import AsyncButton from "../common/AsyncButton";
import { toast } from "react-toastify";
import { useComplaints } from "../../context/ComplaintContext";
import { COMPLAINT_DESCRIPTION_RULES } from "../../utils/InputRules";

function ComplaintForm({ formattedComplaintData, onClose, layoutID }) {
  const { createComplaint } = useComplaints();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const BASE_RULES = {
    required: "This field is required",
    minLength: {
      value: 2,
      message: "Must be at least 2 characters",
    },
  };

  const ID_RULES = {
    required: "This field is required",
    pattern: {
      value: /^[0-9]+$/,
      message: "Must be a number",
    },
    validate: (value) => parseInt(value, 10) > 0 || "Must be a positive number",
  };

  const SUBJECT_RULES = {
    ...BASE_RULES,
    pattern: {
      value: /^[A-Za-z ]+$/,
      message: "Must contain only letters",
    },
    maxLength: {
      value: 30,
      message: "Subject should not exceed 30 characters",
    },
  };

  const onSubmit = async (data) => {
    try {
      await createComplaint(data);
      onClose();
      toast.success("Complaint created succesfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error creating complaint! " + error.response.data);
    }
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const determineRules = (inputName) => {
    if (inputName.includes("ID")) {
      return { ID_RULES };
    } else if (inputName === "subject") {
      return SUBJECT_RULES;
    }
    return BASE_RULES;
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      layoutId={layoutID}
      className="complaint-form-container"
      style={{ height: "70vh", width: "60vw" }}
    >
      <div className="block-tile ml-0">
        <div className="flex-aligned-container">
          <AnimatedButton Icon={<CloseIcon />} onClick={onClose} />

          <span style={{ fontSize: "18px", fontWeight: "bold" }}>
            Create Complaint
          </span>

          <AsyncButton
            asyncOnClick={handleSubmit(onSubmit)}
            text="Send"
            style={{
              maxWidth: "10%",
              height: "50px",
              backgroundColor: "#98FF98",
            }}
          />
        </div>
      </div>
      <form style={{ height: "90%", width: "100%" }}>
        <motion.div
          className="complaint-input-row"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {formattedComplaintData.inputRow.map((input) => (
            <CustomInput
              style={{ width: "30%" }}
              key={input.name}
              name={input.name}
              control={control}
              placeholder={input.placeholder}
              label={input.label}
              defaultValue={input.value || ""}
              rules={determineRules(input.name)}
              error={errors[input.name]}
              variants={itemVariants}
            />
          ))}
        </motion.div>
        <div className="block-tile ml-0" style={{ flex: 2, height: "90%" }}>
          <CustomInput
            style={{ height: "70%" }}
            name={formattedComplaintData.inputBlock.name}
            control={control}
            placeholder={formattedComplaintData.inputBlock.placeholder}
            label={formattedComplaintData.inputBlock.label}
            defaultValue={formattedComplaintData.inputBlock.value || ""}
            rules={COMPLAINT_DESCRIPTION_RULES}
            isTextarea={true}
            error={errors[formattedComplaintData.inputBlock.name]}
            variants={itemVariants}
          />
        </div>
      </form>
    </motion.div>
  );
}

export default ComplaintForm;
