import React from "react";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  capitalizeFirstLetter,
  formatChileanDateTime,
} from "../../../components/common/utils";
import CustomCard from "../../../components/common/CustomCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TagIcon from "@mui/icons-material/Tag";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AdminComplaintOptions from "./AdminComplaintOptions";
import DefaultComplaintOptions from "./DefaultComplaintOptions";

const containerVariants = {
  hidden: { opacity: 1, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      duration: 0.3,
    },
  },
};

function ComplaintLayout({ complaint, onClickBack, user }) {
  return (
    <motion.div
      className="page"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="page-header"
        style={{ maxHeight: "35vh" }}
        variants={itemVariants}
      >
        <div className="block-tile">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClickBack}
          >
            <ArrowBackIcon />
          </motion.div>
          <h2> {complaint.subject} </h2>
          <div className="standout-list-tile-invert">
            <CalendarMonthIcon />
            <span> {formatChileanDateTime(complaint.dateTime)} </span>
          </div>
          <div className="block-tile ml-0" style={{ flexDirection: "row" }}>
            <div
              className="standout-list-tile-invert"
              style={{ flex: 1, marginRight: "10px" }}
            >
              <AlternateEmailIcon style={{ marginRight: "10px" }} />
              <span> {complaint.id} </span>
            </div>
            <div className="standout-list-tile-invert" style={{ flex: 1 }}>
              <span> Status :</span>
              <span> {capitalizeFirstLetter(complaint.complaintStatus)} </span>
            </div>
          </div>
        </div>
        <div className="block-tile" />

        <div className="block-tile" style={{ justifyContent: "center" }}>
          {complaint.complaintStatus === "RESOLVED" ? (
            <ResolvedComplaintCard
              resolutionDetails={complaint.resolutionDetails}
            />
          ) : user.role === "ADMIN" ? (
            <AdminComplaintOptions complaint={complaint} />
          ) : (
            <DefaultComplaintOptions
              complaint={complaint}
              onClickBack={onClickBack}
            />
          )}
        </div>
      </motion.div>
      <motion.div
        className="page-content"
        style={{ flexDirection: "column" }}
        variants={itemVariants}
      >
        <div className="block-tile" style={{ marginLeft: 0 }}>
          <div
            className="standout-list-tile-column"
            style={{ maxWidth: "82vw" }}
          >
            <h4> Complaint Description </h4>
            <div className="divider-horizontal" />
            <div
              className="standout-list-tile"
              style={{
                overflowY: "auto",
                lineHeight: "1.5em", // Ajusta esto según el diseño de tu texto
                maxHeight: "4.5em", // Altura para 3 líneas de texto
              }}
            >
              <p style={{ whiteSpace: "normal" }}> {complaint.context} </p>
            </div>
          </div>
        </div>

        <div
          className="block-tile"
          style={{ flexDirection: "row", marginLeft: 0 }}
        >
          <div className="block-tile" style={{ marginLeft: 0, flex: 2 }}>
            <div className="standout-list-tile-column">
              <h4> Involved Users </h4>
              <div className="divider-horizontal" />
              <div
                className="content-row"
                style={{ alignItems: "center", overflowX: "hidden" }}
              >
                <CustomCard
                  style={{ height: "40vh" }}
                  linkRoute={user.role === "ADMIN" ? "/admin-users/" : null}
                  propRoute={["id"]}
                  element={complaint.user}
                  propsToShow={["role"]}
                  iconMap={{ role: <TagIcon /> }}
                />
                <ArrowForwardIcon />
                <CustomCard
                  style={{ height: "40vh" }}
                  linkRoute={user.role === "ADMIN" ? "/admin-users/" : null}
                  propRoute={["id"]}
                  element={complaint.targetUser}
                  propsToShow={["role"]}
                  iconMap={{ role: <TagIcon /> }}
                />
              </div>
            </div>
          </div>
          <div className="block-tile">
            <div
              className="standout-list-tile-column"
              style={{ height: "100%", marginBottom: "0" }}
            >
              <h4> Product Involved </h4>
              <div className="divider-horizontal" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CustomCard
                  linkRoute="/product/"
                  propRoute={["id"]}
                  element={complaint.product}
                  propsToShow={["price"]}
                  iconMap={{
                    price: <AttachMoneyIcon style={{ color: "#98FF98" }} />,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ResolvedComplaintCard({ resolutionDetails }) {
  return (
    <div
      className="standout-list-tile-invert"
      style={{ flexDirection: "column", alignItems: "start" }}
    >
      <div style={{ fontWeight: "bold", padding: "8px" }}>
        {" "}
        Resolution Details{" "}
      </div>
      <div className="divider-horizontal" />
      <p style={{ padding: "8px" }}> {resolutionDetails} </p>
    </div>
  );
}

export default ComplaintLayout;
