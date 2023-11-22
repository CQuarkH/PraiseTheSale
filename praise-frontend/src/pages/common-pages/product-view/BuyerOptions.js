import React, { useState } from "react";
import FeedbackIcon from "@mui/icons-material/Feedback";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AnimatedTile from "../../../components/common/AnimatedTile";
import { useAxios } from "../../../api/useAxios";

function BuyerOptions({ seller, product }) {
  const [showSellerData, setShowSellerData] = useState(false);
  const axiosInstance = useAxios();

  const requestDataBody = {
    productId: product.id,
    sellerId: seller.id,
  };

  const handleRequestSellerData = async () => {
    if (!showSellerData) {
      try {
        await axiosInstance.post("/request-seller-data", requestDataBody);
        setShowSellerData(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const showSellerDataHandler = (value) => {
    if (showSellerData === false) {
      return "*".repeat(value.length);
    } else {
      return value;
    }
  };

  return (
    <div className="block-tile">
      <div className="block-tile" style={{ marginBottom: "10px" }}>
        <div className="standout-list-tile-invert-column">
          <h4> Contact Data </h4>
          <div className="standout-list-tile">
            <EmailIcon />
            <span> {showSellerDataHandler(seller.email)} </span>
          </div>
          {seller.contactPhone && (
            <div className="standout-list-tile">
              <PhoneIcon />
              <span>{showSellerDataHandler(seller.contactPhone)}</span>
            </div>
          )}
        </div>
      </div>
      <div className="block-tile">
        <AnimatedTile
          onClick={handleRequestSellerData}
          style={{ cursor: "pointer" }}
          className="standout-list-tile-invert"
        >
          <FeedbackIcon style={{ color: "#98FF98" }} />
          <h4> Request Seller Data </h4>
        </AnimatedTile>
      </div>
    </div>
  );
}

export default BuyerOptions;
