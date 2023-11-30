import React, { useState } from "react";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { USER_TYPES } from "../../../../test-api/UserTypes";
import StarRateIcon from "@mui/icons-material/StarRate";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import StoreIcon from "@mui/icons-material/Store";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import InventoryIcon from "@mui/icons-material/Inventory";
import EditIcon from "@mui/icons-material/Edit";
import Edit from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AnimatedButton from "../../../common/AnimatedButton";
import UpdateProfileCard from "./UpdateProfileCard";
import { useAuth } from "../../../../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import { formatChileanDateTime } from "../../../common/utils";
import ProfileMenu from "./ProfileMenu";

function ProfileCard({ user, closeCard, layoutID }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const { logout } = useAuth();

  const toggleUpdating = () => {
    setIsUpdating(!isUpdating);
  };

  return (
    <motion.div
      layoutId={layoutID}
      className="profile-card"
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {isUpdating ? (
        <UpdateProfileCard user={user} toggleUpdating={toggleUpdating} />
      ) : (
        <ViewProfileCard
          logout={logout}
          user={user}
          closeCard={() => closeCard()}
          toggleUpdating={toggleUpdating}
        />
      )}
    </motion.div>
  );
}

function ViewProfileCard({ user, closeCard, toggleUpdating, logout }) {
  return (
    <>
      <div className="card-options-container">
        <AnimatedButton
          Icon={<CloseIcon style={{ color: "#FFFFFF" }} />}
          onClick={() => closeCard()}
        />

        <div className="flex-aligned-container">
          <AnimatedButton Icon={<EditIcon />} onClick={toggleUpdating} />
          <ProfileMenu />
        </div>
      </div>
      <div className="card-content-container">
        <div className="left-side-card">
          <img src={user.imageLink} />
          <div className="standout-list-tile">
            {user === USER_TYPES.SELLER ? <StoreIcon /> : <PersonIcon />}
            <h4> {user.name} </h4>
          </div>
          {user.role === "SELLER" && (
            <div className="standout-list-tile">
              <StarRateIcon />
              <span> {user.rating} rating in PraiseTheSale </span>
            </div>
          )}
          <div
            className="standout-list-tile"
            style={{ flex: "1", maxHeight: "50px" }}
          >
            <p style={{ textAlign: "justify", overflowY: "auto" }}>
              {user.description}
            </p>
          </div>
        </div>
        <div className="divider" />
        <div className="right-side-card">
          <div className="divider-horizontal" />
          <div className="block-tile">
            <h4>Additional Info</h4>
            <div className="standout-list-tile">
              <EmailIcon />
              <span> {user.email} </span>
            </div>
            <div className="standout-list-tile">
              <CalendarMonthIcon />
              <span> {formatChileanDateTime(user.creationTime)} </span>
            </div>
            <div className="standout-list-tile">
              <AlternateEmailIcon />
              <span> {user.id} </span>
            </div>
            {user === USER_TYPES.SELLER && (
              <div className="standout-list-tile">
                <InventoryIcon />
                <span> {user.products} products</span>
              </div>
            )}
          </div>
          {user.role === "SELLER" && (
            <>
              <div className="divider-horizontal" />
              <div className="block-tile">
                <h4>Contact Data</h4>
                <div className="standout-list-tile">
                  <PhoneIcon />
                  <span> {user.contactPhone} </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
