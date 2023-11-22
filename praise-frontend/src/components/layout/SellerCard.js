import React from "react";
import CustomCard from "../common/CustomCard";
import { AnimatePresence } from "framer-motion";
import StarRateIcon from "@mui/icons-material/StarRate";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { useAuth } from "../../context/AuthContext";

function SellerCard({ element: seller, id = false, style }) {
  const { authData } = useAuth();
  const route = authData.role === "ADMIN" ? "/admin-users/" : "/seller/";

  let sellerIconMap = {
    rating: <StarRateIcon />,
  };

  if (id) {
    sellerIconMap["id"] = <AlternateEmailIcon />;
  }

  const sellerPropsLabel = {
    rating: "in PraiseTheSale.",
  };

  const onFalsyProps = {
    rating: "No rating available",
    description: "No description available",
  };

  return (
    <AnimatePresence>
      <CustomCard
        style={style}
        layoutID={`seller-${seller.id}`}
        key={`seller-${seller.id}`}
        element={seller}
        propsToShow={
          id ? ["id", "rating", "description"] : ["rating", "description"]
        }
        onFalsyProps={onFalsyProps}
        propsLabel={sellerPropsLabel}
        iconMap={sellerIconMap}
        linkRoute={route}
        propRoute={["id"]}
      />
    </AnimatePresence>
  );
}

export default SellerCard;
