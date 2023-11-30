import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuth } from "../../../../context/AuthContext";
import { useAxios } from "../../../../api/useAxios";
import { toast } from "react-toastify";

function DeleteAccountDialog({ open, onClose }) {
  const { logout, authData } = useAuth();
  const axiosInstance = useAxios("user");
  const userID = authData.user.id;
  console.log(userID);

  const handleDeleteAccount = async () => {
    try {
      await axiosInstance.delete(`/delete-account/${userID}`);
      onClose();
      logout();
      toast.success("Account deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting account! " + error.response.data);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            backgroundColor: "#1b1f31",
            color: "white",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Action"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "white" }}
          >
            Are you sure you want to delete your account? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} sx={{ color: "white" }}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAccount}
            sx={{
              color: "#111111",
              backgroundColor: "red",
              "&:hover": { backgroundColor: "darkred" },
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteAccountDialog;
