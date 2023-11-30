import React, { useState } from "react";
import StoreIcon from "@mui/icons-material/Store";
import Tab from "../../components/common/Tab";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CustomInput from "../../components/common/CustomInput";
import {
  NAME_RULES,
  PASSWORD_RULES,
  EMAIL_RULES,
} from "../../utils/InputRules";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AsyncButton from "../../components/common/AsyncButton";

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState("BUYER");

  const handleTabChange = () => {
    setIsLogin(!isLogin);
  };

  const onLoginSubmit = async (data) => {
    await axios
      .post("http://localhost:8080/api/auth/login", data)
      .then((response) => {
        login(response.data.token, response.data.role);
        toast.success("Login successful!");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Login failed! " + error.response.data);
      });
  };

  const onRegisterSubmit = async (data) => {
    const registrationData = {
      ...data,
      role: role.toUpperCase(),
    };

    await axios
      .post("http://localhost:8080/api/auth/register", registrationData)
      .then((response) => {
        toast.success(response.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error on register! " + error.response.data);
      });
  };

  const REPEAT_PASSWORD_RULES = {
    required: "Please repeat the password",
    validate: (value) =>
      value === watch("password") || "Passwords do not match",
  };

  return (
    <div className="overlay">
      <div className="login-card">
        <div
          className="block-tile"
          style={{
            flexDirection: "row",
            maxHeight: "10%",
            color: "white",
            justifyContent: "space-between",
            marginLeft: 0,
          }}
        >
          <div className="sidebar-header">
            <StoreIcon
              fontSize="large"
              style={{ color: "#98FF98", marginRight: "10px" }}
            />
            <span>PraiseTheSale</span>
          </div>
          <div>
            <h3>
              {isLogin
                ? "Hi! Welcome back to PraiseTheSale"
                : "Dive into deals with PraiseTheSale!"}
            </h3>
          </div>
        </div>
        <div className="block-tile ml-0" style={{ maxHeight: "90%" }}>
          <div
            className="tabs"
            style={{ maxWidth: "98%", marginTop: "20px", marginBottom: "10px" }}
          >
            <Tab label="Login" isActive={isLogin} onClick={handleTabChange} />

            <Tab
              label="Register"
              isActive={!isLogin}
              onClick={handleTabChange}
            />
          </div>
          <div className="block-tile ml-0">
            {isLogin ? (
              <LoginBody
                control={control}
                rules={{ email: EMAIL_RULES, password: PASSWORD_RULES }}
                errors={errors}
              />
            ) : (
              <RegisterBody
                role={role}
                setRole={setRole}
                control={control}
                watch={watch}
                rules={{
                  email: EMAIL_RULES,
                  password: PASSWORD_RULES,
                  name: NAME_RULES,
                  repeatPassword: REPEAT_PASSWORD_RULES,
                }}
                errors={errors}
              />
            )}
          </div>
          <div className="block-tile ml-0" style={{ flex: 2 }}>
            <ActionButton
              isLogin={isLogin}
              errors={errors}
              onLogin={handleSubmit(onLoginSubmit)}
              onRegister={handleSubmit(onRegisterSubmit)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function RegisterBody({ control, rules, errors, watch, setRole, role }) {
  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  return (
    <motion.form className="login-form">
      <div
        className="block-tile ml-0"
        style={{ flex: 1, flexDirection: "row" }}
      >
        <div className="block-tile ml-0">
          <CustomInput
            error={errors.name}
            style={{ marginBottom: 0, padding: 0 }}
            invert={false}
            label="Full Name"
            placeholder="Write your name here..."
            type="text"
            control={control}
            name="name"
            rules={rules.name}
          />
        </div>
        <div className="block-tile">
          <CustomInput
            error={errors.email}
            style={{ marginBottom: 0, padding: 0 }}
            invert={false}
            label="Email"
            placeholder="Write your email here..."
            type="email"
            control={control}
            name="email"
            rules={rules.email}
          />
        </div>
      </div>
      <div
        className="block-tile ml-0"
        style={{ flex: 1, flexDirection: "row" }}
      >
        <div className="block-tile ml-0">
          <CustomInput
            error={errors.password}
            style={{ marginBottom: 0, padding: 0 }}
            invert={false}
            label="Password"
            placeholder="Write your password here..."
            type="password"
            control={control}
            name="password"
            rules={rules.password}
          />
        </div>
        <div className="block-tile">
          <CustomInput
            error={errors.repeatPassword}
            style={{ marginBottom: 0, padding: 0 }}
            invert={false}
            label="Repeat Password"
            placeholder="Repeat your password here..."
            type="password"
            control={control}
            name="repeatPassword"
            rules={rules.repeatPassword}
          />
        </div>
      </div>
      <div
        className="block-tile ml-0"
        style={{
          flex: 1,
          color: "white",
          flexDirection: "row",
          padding: "8px",
        }}
      >
        <h4 style={{ marginRight: "20px" }}> Role:</h4>
        <div className="tabs" style={{ marginBottom: "10px", maxWidth: "98%" }}>
          <Tab
            label="Buyer"
            isActive={role === "BUYER"}
            onClick={() => handleRoleChange("BUYER")}
          />
          <Tab
            label="Seller"
            isActive={role === "SELLER"}
            onClick={() => handleRoleChange("SELLER")}
          />
        </div>
      </div>
    </motion.form>
  );
}

function LoginBody({ control, rules, errors }) {
  return (
    <form className="login-form">
      <div className="block-tile ml-0">
        <CustomInput
          error={errors.email}
          style={{ marginBottom: 0, paddingBottom: 0 }}
          invert={false}
          label="Email"
          placeholder="Write your email here..."
          type="email"
          control={control}
          name="email"
          rules={rules.email}
        />
      </div>
      <div className="block-tile ml-0">
        <CustomInput
          error={errors.password}
          style={{ marginBottom: 0, paddingBottom: 0 }}
          invert={false}
          label="Password"
          placeholder="Write your password here..."
          type="password"
          control={control}
          name="password"
          rules={rules.password}
        />
        <Link
          to="/forgot-password"
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
            textAlign: "right",
            color: "whitesmoke",
            paddingBottom: "15px",
          }}
        >
          Forgot Password?
        </Link>
      </div>
    </form>
  );
}

function ActionButton({ isLogin, onLogin, onRegister }) {
  return (
    <AsyncButton
      text={isLogin ? "Login" : "Register"}
      asyncOnClick={isLogin ? onLogin : onRegister}
    />
  );
}

export default LoginRegister;
