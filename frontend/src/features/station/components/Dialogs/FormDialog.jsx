import { LoadingButton } from "@mui/lab";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import validate from "../../../../utils/validation";

function FormDialog({
  open,
  title,
  titleButton,
  loading,
  error,
  forms,
  handleForm,
  handleClose,
  handleSubmit,
}) {
  console.log(error);
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth={true}>
      <DialogTitle sx={{ bgcolor: "primary.main", color: "white" }}>
        <Typography>{title}</Typography>
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Typography textTransform="capitalize" fontSize={14}>
          Name
        </Typography>
        <TextField
          error={Boolean(validate("name", error))}
          fullWidth={true}
          size="small"
          value={forms.name}
          onChange={(e) => handleForm(e.target.value, "name")}
          helperText={validate("name", error)}
        ></TextField>
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
          variant="contained"
          loading={loading}
          onClick={handleSubmit}
        >
          <Typography variant="button" textTransform={"capitalize"}>
            {titleButton}
          </Typography>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default FormDialog;
