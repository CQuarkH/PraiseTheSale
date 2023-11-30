import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../../components/common/CustomInput";
import { PASSWORD_RULES } from "../../utils/InputRules";
import { toast } from "react-toastify";
import axios from "axios";
import AsyncButton from "../../components/common/AsyncButton";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const REPEAT_PASSWORD_RULES = {
    required: "Please repeat the password",
    validate: (value) =>
      value === watch("password") || "Passwords do not match",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const getQueryParams = () => {
    return new URLSearchParams(location.search);
  };

  const queryParams = getQueryParams();
  const token = queryParams.get("token");

  const handleChangePassword = async (data) => {
    try {
      const resetPasswordData = {
        token: token,
        newPassword: data.password,
      };

      await axios.post(
        "http://localhost:8080/api/auth/reset-password",
        resetPasswordData
      );
      toast.success("Password reseted successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Error reseting password! " + error.response.data);
    }
  };

  return (
    <div className="overlay">
      <div className="dialog-card" style={{ height: "55%", width: "50%" }}>
        <div className="flex-aligned-container">
          <h4>Recover Password</h4>
        </div>
        <div className="divider-horizontal" />
        <div className="block-tile ml-0">
          <CustomInput
            label="Password"
            control={control}
            error={errors.password}
            name="password"
            rules={PASSWORD_RULES}
          />
          <CustomInput
            label="Repeat password"
            control={control}
            error={errors.repeatPassword}
            name="repeatPassword"
            rules={REPEAT_PASSWORD_RULES}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <AsyncButton
            text="Change Password"
            style={{ width: "200px", height: "50px" }}
            asyncOnClick={handleSubmit(handleChangePassword)}
          />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
