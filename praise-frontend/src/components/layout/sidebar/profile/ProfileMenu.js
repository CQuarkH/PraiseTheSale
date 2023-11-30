import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useAuth } from "../../../../context/AuthContext";
import { toast } from "react-toastify";
import { ListItemIcon } from "@mui/material";
import DeleteAccountDialog from "./DeleteAccountDialog";

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { logout } = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    toast.success("Logout successful");
  };

  const handleDeleteAccount = () => {
    setIsDeleteDialogOpen(true);
    handleClose();
  };

  return (
    <div style={{ color: "white" }}>
      <IconButton
        aria-label="more"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color: "white" }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: "#1b1f31",
          },
        }}
        MenuListProps={{
          sx: {
            color: "white",
          },
        }}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon style={{ color: "white" }} />
          </ListItemIcon>
          Logout
        </MenuItem>
        <MenuItem onClick={handleDeleteAccount} style={{ color: "red" }}>
          <ListItemIcon>
            <PersonRemoveIcon style={{ color: "red" }} />
          </ListItemIcon>
          Delete Account
        </MenuItem>
      </Menu>

      <DeleteAccountDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  );
}

export default ProfileMenu;
