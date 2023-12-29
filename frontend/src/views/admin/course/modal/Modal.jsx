import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function Modal({
  handleChange,
  handleSubmit,
  handleClose,
  open,
  forms,
  title,
  subtitle = "",
  loading,
  error,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ bgcolor: "primary.main", color: "white" }}>
        <Typography variant="subtitle2">{title + " " + "Course"}</Typography>
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        {subtitle.length != 0 && (
          <Typography fontSize={14}>{subtitle}</Typography>
        )}
        {subtitle.length == 0 && (
          <>
            <Typography fontSize={13}>Course Name</Typography>
            <FormControl fullWidth>
              <TextField
                size="small"
                value={forms.name}
                onChange={(e) => handleChange(e.target.value, "name")}
              ></TextField>
              <FormHelperText></FormHelperText>
            </FormControl>
          </>
        )}
      </DialogContent>
      <Divider></Divider>
      <DialogActions>
        <Box flexGrow={1}></Box>
        <Button
          size="small"
          sx={{ color: "text.disabled" }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          size="small"
          loading={loading}
          onClick={handleSubmit}
        >
          {title}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
