import React, { useState } from "react";
import AnimatedTile from "../../../components/common/AnimatedTile";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateComplaintCard from "./UpdateComplaintCard";

function AdminComplaintOptions({ complaint }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const layoutID = "update-complaint";

  const onClose = () => {
    setIsUpdating(false);
  };

  return (
    <>
      <AnimatedTile
        layoutID={layoutID}
        onClick={() => setIsUpdating(!isUpdating)}
        className="standout-list-tile-invert"
      >
        <TipsAndUpdatesIcon style={{ color: "#98FF98" }} />
        <h4> Update Status </h4>
      </AnimatedTile>

      {isUpdating && (
        <UpdateComplaintCard
          complaint={complaint}
          layoutID={layoutID}
          onClose={onClose}
        />
      )}
    </>
  );
}

export default AdminComplaintOptions;
