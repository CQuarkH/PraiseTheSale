import React from "react";
import AdminOptions from "./AdminOptions";
import BuyerOptions from "./BuyerOptions";
import SellerOptions from "./SellerOptions";
import { motion } from "framer-motion";
import AnimatedTile from "../../../components/common/AnimatedTile";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StoreIcon from "@mui/icons-material/Store";
import StarRateIcon from "@mui/icons-material/StarRate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { capitalizeFirstLetter } from "../../../components/common/utils";
import RelatedProducts from "./RelatedProducts";
import SellerCard from "../../../components/layout/SellerCard";

function ProductLayout({ product, seller, authRole, onBackClick }) {
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

  const renderAdminOptions = () => {
    if (authRole === "ADMIN") {
      return <AdminOptions seller={seller} product={product} />;
    }
  };

  const renderSellerOptions = () => {
    if (authRole === "SELLER") {
      return <SellerOptions product={product} seller={seller} />;
    }
  };

  const renderBuyerOptions = () => {
    if (authRole === "BUYER") {
      return <BuyerOptions seller={seller} product={product} />;
    }
  };

  return (
    <motion.div
      key={product.id}
      className="page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="page-header"
        style={{ maxHeight: "35vh" }}
      >
        <div className="block-tile" style={{ marginLeft: "0" }}>
          <div className="button-image-container">
            <motion.img src={product.imageLink} />
            <AnimatedTile className="button-image-back" onClick={onBackClick}>
              <ArrowBackIcon />
            </AnimatedTile>
          </div>
        </div>
        <div className="block-tile" style={{ justifyContent: "space-evenly" }}>
          <h2> {product.name} </h2>
          <div className="standout-list-tile-invert">
            <AlternateEmailIcon />
            <span> {product.id} </span>
          </div>
          <div className="standout-list-tile-invert">
            <AttachMoneyIcon style={{ color: "#98FF98" }} />
            <h3> {product.price} </h3>
          </div>
          <div className="standout-list-tile-invert">
            <span> Condition : </span>
            <span> {capitalizeFirstLetter(product.condition)} </span>
          </div>
        </div>
        <div className="block-tile" />
        {renderBuyerOptions()}
        {renderSellerOptions()}
        {renderAdminOptions()}
      </motion.div>
      <motion.div
        className="page-content"
        style={{ height: "80vh" }}
        variants={itemVariants}
      >
        {/* left side */}
        <div
          className="block-tile"
          style={{
            marginLeft: 0,
            flex: 2,
            maxHeight: "100%",
            flexDirection: "column",
            maxWidth: "55vw",
          }}
        >
          <div className="standout-list-tile-column">
            <h4> Description </h4>
            <div className="divider-horizontal" />
            <div
              className="standout-list-tile"
              style={{
                overflowY: "auto",
                lineHeight: "1.5em",
                maxHeight: "4.5em",
              }}
            >
              <p> {product.description} </p>
            </div>
          </div>
          {product.relatedProducts && (
            <RelatedProducts relatedProducts={product.relatedProducts} />
          )}
        </div>
        {/* right side */}
        {product.seller !== undefined && (
          <div className="block-tile" style={{ flex: 1, maxHeight: "100%" }}>
            <SellerCard
              element={seller}
              id={true}
              style={{ width: "90%", height: "100%" }}
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default ProductLayout;
