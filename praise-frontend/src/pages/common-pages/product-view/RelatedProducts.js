import React from "react";
import CustomCard from "../../../components/common/CustomCard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function RelatedProducts({ relatedProducts }) {
  return (
    <div
      className="standout-list-tile-column"
      style={{ flex: 1, maxHeight: "69%" }}
    >
      <h4> Similar items from this vendor </h4>
      <div className="divider-horizontal" />
      <div
        className="content-row"
        style={{ maxWidth: "100%", flex: 1, maxHeight: "100%" }}
      >
        {relatedProducts.length === 0 ? (
          <div className="center-message-container">
            <h4> Nothing to show :( </h4>
          </div>
        ) : (
          relatedProducts.map((product) => (
            <CustomCard
              key={product.id}
              style={{ maxHeight: "80%", marginLeft: "20px" }}
              linkRoute="/product/"
              element={product}
              propsToShow={["price"]}
              propRoute={["id"]}
              iconMap={{ price: <AttachMoneyIcon /> }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default RelatedProducts;
