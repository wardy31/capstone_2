import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";

function ConfirmationModal({
  open,
  handleClose,
  handleClick,
  title,
  content,
  buttonTitle,
  loading,
}) {
  return (
    <Dialog maxWidth="xs" open={open} onClose={handleClose}>
      <DialogTitle
        sx={{ bgcolor: "primary.main", color: "white", fontWeight: "bold" }}
      >
        <Typography fontSize={16} fontWeight={"bold"}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography sx={{ pt: 4, color: "text.primary" }}>
            {content}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Box flexGrow={1}></Box>
        <Button
          sx={{ color: "text.disabled", textTransform: "capitalize" }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <LoadingButton
          onClick={handleClick}
          loading={loading}
          sx={{ color: "white", textTransform: "capitalize" }}
          variant="contained"
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationModal;
