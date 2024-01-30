import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";

function ConfirmationDialog({
  loading,
  title,
  titleButton,
  content,
  open,
  handleClose,
  handleSubmit,
  isDelete = true,
}) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xs">
      <DialogTitle sx={{ bgcolor: "primary.main", color: "white" }}>
        <Typography>{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mt: 4 }}>
          <Typography>{content}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          <Typography
            variant="button"
            textTransform={"capitalize"}
            sx={{ color: "text.secondary" }}
          >
            Cancel
          </Typography>
        </Button>
        <LoadingButton
          loading={loading}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          <Typography variant="button" textTransform={"capitalize"}>
            {isDelete ? "Delete" : titleButton}
          </Typography>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
