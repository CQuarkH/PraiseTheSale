import React, { useState } from "react";
import AnimatedTile from "../../../components/common/AnimatedTile";
import BlockIcon from "@mui/icons-material/Block";
import StoreIcon from "@mui/icons-material/Store";
import CloseIcon from "@mui/icons-material/Close";
import TextButton from "../../../components/common/TextButton";
import { motion } from "framer-motion";
import { useAxios } from "../../../api/useAxios";
import { useForm } from "react-hook-form";
import CustomInput from "../../../components/common/CustomInput";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { toast } from "react-toastify";
import AsyncButton from "../../../components/common/AsyncButton";

const REASON_RULES = {
  required: "Reason are required",
  minLength: {
    value: 10,
    message: "Must be at least 10 characters",
  },
};

function AdminUserOptions({ user, navigate }) {
  const [isOpen, setOpen] = useState(false);
  const [isBanned, setBanned] = useState(user.banned);
  const layoutID = "ban-user";

  return (
    <>
      <AnimatedTile
        className="standout-list-tile-invert"
        layoutID={layoutID}
        onClick={() => setOpen(true)}
      >
        {isBanned ? (
          <>
            <CheckCircleOutlineIcon style={{ color: "#98FF98" }} />
            <h4> Unban User </h4>
          </>
        ) : (
          <>
            <BlockIcon style={{ color: "#FF4C4C" }} />
            <h4> Ban User </h4>
          </>
        )}
      </AnimatedTile>
      {user.role === "SELLER" && (
        <AnimatedTile
          className="standout-list-tile-invert"
          onClick={() => navigate(`/seller/${user.id}`)}
        >
          <StoreIcon style={{ color: "#98FF98" }} />
          <h4> View Products </h4>
        </AnimatedTile>
      )}

      {isOpen && (
        <BanOrUnbanUserCard
          user={user}
          layoutID={layoutID}
          onClose={() => setOpen(false)}
          isBanned={isBanned}
          setBanned={setBanned}
        />
      )}
    </>
  );
}

function BanOrUnbanUserCard({ user, layoutID, onClose, isBanned, setBanned }) {
  const axiosInstance = useAxios();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdateUserBanStatus = (data) => {
    try {
      axiosInstance.put(`/users/${user.id}/ban-user`, {
        userId: user.id,
        userEmail: user.email,
        reason: data.reason,
        ban: !isBanned,
      });
      toast.success(
        `User ${
          isBanned ? "unbanned" : "banned"
        } successfully! User will be notified.`
      );
      setBanned(!isBanned);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error updating user ban status! " + error.response.data);
    }
  };

  return (
    <div className="profile-overlay">
      <motion.div className="dialog-card" layoutId={layoutID}>
        <div className="flex-aligned-container">
          <motion.div onClick={onClose}>
            <CloseIcon />
          </motion.div>
          <h4> Write a reason for {isBanned ? "unban" : "ban"} this user </h4>
          <AsyncButton
            style={{ width: "100px", height: "50px" }}
            text="Done"
            asyncOnClick={handleSubmit(handleUpdateUserBanStatus)}
          />
        </div>
        <div className="divider-horizontal" />
        <CustomInput
          control={control}
          isTextarea={true}
          rules={REASON_RULES}
          error={errors.reason}
          name="reason"
          placeholder="Write the reason..."
          style={{ height: "100%" }}
        />
      </motion.div>
    </div>
  );
}

export default AdminUserOptions;
