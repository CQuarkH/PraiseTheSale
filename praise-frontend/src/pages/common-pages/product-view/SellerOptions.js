import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedTile from "../../../components/common/AnimatedTile";
import EditIcon from "@mui/icons-material/Edit";
import RestoreIcon from "@mui/icons-material/Restore";
import CloseIcon from "@mui/icons-material/Close";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import UpdateProductCard from "../../../components/layout/UpdateProductCard";
import { useAxios } from "../../../api/useAxios";
import TextButton from "../../../components/common/TextButton";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CustomInput from "../../../components/common/CustomInput";

const EMAIL_RULES = {
  required: "Email is required",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    message: "Invalid email format",
  },
};

function SellerOptions({ product }) {
  const [editMode, toggleEditMode] = useState(false);
  const axiosInstance = useAxios();
  const [markedAsSold, setMarkedAsSold] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const layoutID = "mark-as-sold";

  const handleMarkAsSoldClick = async () => {
    if (markedAsSold) {
      try {
        await axiosInstance.put(`/products/${product.id}/unmark-as-sold`);
        setMarkedAsSold(false);
        toast.success("Product relisted successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Error relisting product! " + error.response.data);
      }
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="block-tile">
      <div className="block-tile">
        <AnimatedTile
          layoutID={"update-product"}
          onClick={toggleEditMode}
          style={{ cursor: "pointer" }}
          className="standout-list-tile-invert"
        >
          <EditIcon style={{ color: "#98FF98" }} />
          <h4> Edit Product </h4>
        </AnimatedTile>
        <AnimatePresence>
          {editMode && (
            <div className="profile-overlay" key="update-product">
              <UpdateProductCard
                product={product}
                setIsAddingProduct={toggleEditMode}
                layoutID={"update-product"}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
      <div className="block-tile">
        <AnimatedTile
          layoutID={layoutID}
          onClick={handleMarkAsSoldClick}
          style={{ cursor: "pointer" }}
          className="standout-list-tile-invert"
        >
          {markedAsSold ? (
            <RestoreIcon style={{ color: "#98FF98" }} />
          ) : (
            <UnpublishedIcon style={{ color: "#FF4C4C" }} />
          )}
          <h4> {markedAsSold ? "Relist" : "Mark as Sold"} </h4>
        </AnimatedTile>
      </div>
      {isOpen && !markedAsSold && (
        <MarkProductAsSoldCard
          product={product}
          onClose={() => setOpen(false)}
          setMarkedAsSold={setMarkedAsSold}
          layoutID={layoutID}
          axiosInstance={axiosInstance}
        />
      )}
    </div>
  );
}

function MarkProductAsSoldCard({
  product,
  onClose,
  setMarkedAsSold,
  axiosInstance,
  layoutID,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleMarkAsSold = async (data) => {
    try {
      await axiosInstance.put(`/products/${product.id}/mark-as-sold`, {
        userEmail: data.email,
      });

      setMarkedAsSold(true);
      onClose();
      toast.success("Product marked as sold successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error marking product as sold! " + error.response.data);
    }
  };

  return (
    <div className="profile-overlay">
      <motion.div className="dialog-card" layoutId={layoutID}>
        <div className="flex-aligned-container">
          <div onClick={onClose}>
            <CloseIcon />
          </div>
          <h4> Enter the email of the user who bought your product </h4>
          <TextButton
            text="Done"
            style={{ width: "100px", height: "50px" }}
            onClick={handleSubmit(handleMarkAsSold)}
          />
        </div>
        <div className="divider-horizontal" />
        <CustomInput
          control={control}
          isTextarea={true}
          rules={EMAIL_RULES}
          error={errors.email}
          name="email"
          placeholder="Write the email..."
          style={{ height: "100%" }}
        />
      </motion.div>
    </div>
  );
}

export default SellerOptions;
