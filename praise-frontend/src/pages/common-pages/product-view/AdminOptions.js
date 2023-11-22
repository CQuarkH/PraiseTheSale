import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AnimatedTile from "../../../components/common/AnimatedTile";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import TextButton from "../../../components/common/TextButton";
import AsyncButton from "../../../components/common/AsyncButton";
import { useForm } from "react-hook-form";
import CustomInput from "../../../components/common/CustomInput";
import { useAxios } from "../../../api/useAxios";
import { toast } from "react-toastify";

const REASON_RULES = {
  required: "Reason are required",
  minLength: {
    value: 10,
    message: "Must be at least 10 characters",
  },
};

function AdminOptions({ seller, product }) {
  const [isOpen, setIsOpen] = useState(false);
  const layoutID = "delete-product";
  const [isSuspended, setSuspended] = useState(product.suspended);

  return (
    <>
      <div className="block-tile">
        <div className="block-tile" style={{ marginBottom: "10px" }}>
          <div className="standout-list-tile-invert-column">
            <h4> Contact Data </h4>
            <div className="standout-list-tile">
              <EmailIcon />
              <span> {seller.email} </span>
            </div>
            {seller.contactPhone && (
              <div className="standout-list-tile">
                <PhoneIcon />
                <span>{seller.contactPhone}</span>
              </div>
            )}
          </div>
        </div>
        <div className="block-tile">
          <AnimatedTile
            layoutID={layoutID}
            onClick={() => setIsOpen(true)}
            style={{ cursor: "pointer" }}
            className="standout-list-tile-invert"
          >
            {isSuspended ? (
              <>
                <AutorenewIcon style={{ color: "#98FF98" }} />
                <h4> Unsuspend Product </h4>
              </>
            ) : (
              <>
                <BlockIcon style={{ color: "#FF4C4C" }} />
                <h4> Suspend Product </h4>
              </>
            )}
          </AnimatedTile>
        </div>
      </div>
      {isOpen && (
        <SuspendProductCard
          layoutID={layoutID}
          onClose={() => setIsOpen(false)}
          product={product}
          seller={seller}
          isSuspended={isSuspended}
          setSuspended={setSuspended}
        />
      )}
    </>
  );
}

function SuspendProductCard({
  layoutID,
  onClose,
  product,
  seller,
  isSuspended,
  setSuspended,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosInstance = useAxios();

  const handleSuspendOrUnsuspendProduct = async (data) => {
    try {
      await axiosInstance.put(`/products/${product.id}/suspend`, {
        sellerEmail: seller.email,
        productId: product.id,
        reason: data.reason,
        suspend: isSuspended ? false : true,
      });

      toast.success(
        `Product ${
          isSuspended ? "unsuspended" : "suspended"
        } successfully! Seller will be notified!`
      );

      setSuspended(!isSuspended);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(
        "Error updating product suspend status! " + error.response.data
      );
    }
  };

  return (
    <div className="profile-overlay">
      <motion.div className="dialog-card" layoutId={layoutID}>
        <div className="flex-aligned-container">
          <motion.div onClick={onClose}>
            <CloseIcon />
          </motion.div>
          <h4>
            Write a reason for {isSuspended ? "unsuspend" : "suspend"} this
            product
          </h4>
          <AsyncButton
            text="Done"
            asyncOnClick={handleSubmit(handleSuspendOrUnsuspendProduct)}
            style={{ width: "100px", height: "50px" }}
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

export default AdminOptions;
