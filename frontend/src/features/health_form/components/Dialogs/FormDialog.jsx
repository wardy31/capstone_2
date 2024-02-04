import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import validate from "../../../../utils/validation";

function FormDialog({
  data,
  loading,
  open,
  title,
  titleButton,
  handleForm,
  handleClose,
  handleSubmit,
  error,
}) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ bgcolor: "primary.main", color: "white" }}>
        <Typography fontSize={16}>{title} </Typography>
      </DialogTitle>
      <DialogContent>
        <Box my={2}>
          <Typography sx={{ fontSize: 14, mb: 1 }}>Question</Typography>
          <TextField
            error={Boolean(validate("title", error))}
            size="small"
            fullWidth
            rows={4}
            multiline
            value={data.title}
            onChange={(e) => handleForm(e.target.value, "title")}
            helperText={validate("title", error)}
          ></TextField>
        </Box>
        {/* <Box>
          <Typography sx={{ fontSize: 14 }}>Subtitle</Typography>
          <TextField
            size="small"
            fullWidth
            value={data.subtitle}
            onChange={(e) => handleForm(e.target.value, "subtitle")}
          ></TextField>
        </Box> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          <Typography
            sx={{
              fontSize: 14,
              textTransform: "capitalize",
              color: "text.secondary",
            }}
          >
            Cancel
          </Typography>
        </Button>
        <LoadingButton
          loading={loading}
          color="primary"
          variant="contained"
          onClick={handleSubmit}
        >
          <Typography sx={{ fontSize: 14, textTransform: "capitalize" }}>
            {titleButton}
          </Typography>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default FormDialog;
