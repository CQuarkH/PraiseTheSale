import React, { useState } from "react";
import CustomInput from "../../../common/CustomInput";
import {
  NAME_RULES,
  DESCRIPTION_RULES,
  PHONE_RULES,
  IMAGE_RULES,
} from "../../../../utils/InputRules";
import AnimatedButton from "../../../common/AnimatedButton";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import ImageUploaderButton from "../../../common/ImageUploaderButton";
import AsyncButton from "../../../common/AsyncButton";
import { useAxios } from "../../../../api/useAxios";
import { useAuth } from "../../../../context/AuthContext";
import { uploadImageService } from "../../../../services/uploadImageService";

function UpdateProfileCard({ user, toggleUpdating }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { updateUserData } = useAuth();
  const axiosInstance = useAxios("user");

  const onSubmit = async (data) => {
    if (Object.keys(errors).length === 0) {
      try {
        if (selectedFile) {
          const imageLink = await uploadImageService(
            selectedFile,
            null,
            "/users"
          );
          data.imageLink = imageLink;
        }

        await updateUserData(axiosInstance, data);

        toggleUpdating();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  return (
    <>
      <div className="card-options-container">
        <AnimatedButton
          Icon={<CloseIcon style={{ color: "#FFFFFF" }} />}
          onClick={toggleUpdating}
        />

        <span style={{ fontSize: "18px", fontWeight: "bold" }}>
          {" "}
          Update Profile{" "}
        </span>

        <AsyncButton
          asyncOnClick={handleSubmit(onSubmit)}
          text="Save"
          style={{ maxHeight: "40px", maxWidth: "100px" }}
        />
      </div>
      <div className="divider-horizontal" />
      <div
        className="card-content-container"
        style={{ maxHeight: "100%", overflowY: "auto" }}
      >
        <div className="block-tile ml-0">
          <div
            className="block-tile ml-0"
            style={{ flex: 1, flexDirection: "row" }}
          >
            <div className="block-tile ml-0" style={{ flex: 1 }}>
              <ImageUploaderButton
                rules={IMAGE_RULES}
                error={errors.imageLink}
                defaultValue={user.imageLink}
                control={control}
                onFileSelect={handleFileSelect}
                name="imageLink"
              />
            </div>
            <div className="block-tile" style={{ flex: 1 }}>
              <CustomInput
                error={errors.fullName}
                style={{ marginBottom: 0, padding: 0 }}
                label="Full Name"
                placeholder="Write your full name..."
                type="text"
                name="name"
                rules={NAME_RULES}
                defaultValue={user.name}
                control={control}
              />
            </div>
          </div>
          <div className="block-tile ml-0" style={{ flex: 2 }}>
            <CustomInput
              error={errors.description}
              rules={DESCRIPTION_RULES}
              style={{ marginBottom: 0, padding: 0, height: "300px" }}
              label="Description"
              placeholder="Write your description"
              type="text"
              isTextarea={true}
              name="description"
              defaultValue={user.description}
              control={control}
            />
          </div>
          {user.role === "SELLER" && (
            <>
              <div className="divider-horizontal" />
              <div className="block-tile ml-0">
                <CustomInput
                  error={errors.contactPhone}
                  style={{ marginBottom: 0, padding: 0 }}
                  label="Contact Phone"
                  placeholder="Write your phone number..."
                  type="text"
                  name="contactPhone"
                  rules={PHONE_RULES}
                  defaultValue={user.contactPhone}
                  control={control}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default UpdateProfileCard;
