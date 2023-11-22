import React, { useMemo } from "react";
import { motion } from "framer-motion";
import TagIcon from "@mui/icons-material/Tag";
import AnimatedTile from "../../../components/common/AnimatedTile";
import BlockIcon from "@mui/icons-material/Block";
import StoreIcon from "@mui/icons-material/Store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchBarComponent from "../../../components/common/SearchBarComponent";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LogTile from "./LogTile";
import ListView from "../../../components/common/ListView";
import {
  capitalizeFirstLetter,
  formatChileanDateTime,
} from "../../../components/common/utils";
import AdminUserOptions from "./AdminUserOptions";

function AdminUserViewLayout({
  user,
  setFilteredLogs,
  filteredLogs,
  navigate,
  logs,
}) {
  const searchBy = useMemo(() => ["actionType", "id", "dateTime"], []);

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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="page"
      variants={containerVariants}
    >
      <motion.div
        className="page-header"
        style={{ maxHeight: "35vh" }}
        variants={itemVariants}
      >
        <div className="block-tile" style={{ marginLeft: "0" }}>
          <div className="button-image-container">
            <img src={user.imageLink} />
            <AnimatedTile
              className="button-image-back"
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon />
            </AnimatedTile>
          </div>
        </div>
        <div
          className="block-tile"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h2> {user.name} </h2>
          <div>
            <div className="standout-list-tile-invert">
              <AlternateEmailIcon />
              <span> {user.id} </span>
            </div>
            <div className="standout-list-tile-invert">
              <TagIcon />
              <span> {capitalizeFirstLetter(user.role)} </span>
            </div>
            <div className="standout-list-tile-invert">
              <EmailIcon />
              <span> {user.email} </span>
            </div>
            <div className="standout-list-tile-invert">
              <CalendarMonthIcon />
              <span> {formatChileanDateTime(user.creationTime)} </span>
            </div>
          </div>
        </div>
        <div className="block-tile" />
        <div
          className="block-tile"
          style={{ flexDirection: "column", justifyContent: "space-evenly" }}
        >
          <AdminUserOptions user={user} navigate={navigate}/>
        </div>
      </motion.div>
      <motion.div className="page-content" variants={itemVariants}>
        {/* description */}
        <div className="block-tile" style={{ marginLeft: 0, height: "50vh" }}>
          <div
            className="standout-list-tile-column"
            style={{ maxHeight: "40%" }}
          >
            <h4> Description </h4>
            <div
              className="standout-list-tile-invert"
              style={{ overflowY: "auto" }}
            >
              <p> {user.description} </p>
            </div>
          </div>
          {/* {
                    user.role === 'SELLER' && (
                <div className='standout-list-tile-column' style={{flex: 1}}>
                    <h4> Seller Data </h4>
                    <div className='standout-list-tile-invert'>
                        <Inventory2Icon/>
                        <span> {user.productList.length} products</span>
                    </div>
                    <div className='standout-list-tile-invert'>
                        <PhoneIcon/>
                        <span> {user.contactPhone} </span>
                    </div>
                </div>
                    )
                   } */}
        </div>
        {/* logs */}
        <div className="block-tile">
          <div
            className="standout-list-tile-column"
            style={{ height: "50vh", overflowY: "auto" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4> User Logs </h4>
              <SearchBarComponent
                elements={logs}
                setFilteredElements={setFilteredLogs}
                searchBy={searchBy}
              />
            </div>
            <div className="divider-horizontal" />
            <ListView elements={filteredLogs} ElementComponent={LogTile} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}


export default AdminUserViewLayout;
