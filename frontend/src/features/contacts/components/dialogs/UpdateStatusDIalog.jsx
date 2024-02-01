import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

function UpdateStatusDIalog({
  open,
  handleClose,
  handleSubmit,
  loading,
  value,
  handleValue,
  isContact = false,
}) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ bgcolor: "primary.main", color: "white" }}>
        <Typography>Update Status</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ fontSize: 14, mb: 1, mt: 3 }}>Status</Typography>
        <FormControl fullWidth>
          <Select value={value} onChange={(e) => handleValue(e.target.value)}>
            <MenuItem value={isContact ? "contact" : "infected"}>
              {isContact ? "Contact" : "Infected"}
            </MenuItem>
            <MenuItem value={"recovered"}>Recovered</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          onClick={handleClose}
          sx={{ textTransform: "capitalize" }}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          onClick={handleSubmit}
          loading={loading}
          variant="contained"
          sx={{ textTransform: "capitalize" }}
        >
          Update
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateStatusDIalog;
