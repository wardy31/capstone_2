import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Typography,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

import React from "react";

function ConfirmInfectedDialog({
  open,
  loading,
  handleClose,
  handleSubmit,
  handleForm,
}) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ bgcolor: "primary.main", color: "white" }}>
        <Typography fontSize={16} fontWeight={"bold"}>
          Infected User
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mt: 2 }}>
          Are you sure to add this user as infected user?
        </DialogContentText>

        <Typography sx={{ color: "text.secondary", mb: 1 }}>
          If yes, specify the date infected.
        </Typography>

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <FormControl fullWidth>
            <DatePicker
              //   label="Date Infected"
              onChange={(newVal) =>
                handleForm(moment(newVal._d).format("YYYY-MM-DD"))
              }
            ></DatePicker>
          </FormControl>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{ textTransform: "capitalize", color: "text.secondary" }}
        >
          Cancel
        </Button>
        <LoadingButton
          loading={loading}
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          sx={{ textTransform: "capitalize" }}
        >
          Add
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmInfectedDialog;
