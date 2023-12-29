import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFaculty } from "../../../../store/actions/facultyInChargeAction";
import { setDialog } from "../../../../store/reducers/facultyInChargeReducer";
import store from "../../../../store/store";

function DeleteModal({ id }) {
  const { dialog, loading } = useSelector(
    (state) => state.facultyInCharge.delete
  );
  const dispatch = useDispatch();

  const handleModal = () => {
    dispatch(setDialog({ type: "delete", payload: !dialog }));
  };

  const handleForm = async () => {
    const res = store.dispatch(deleteFaculty(id, true));
    if (res) {
      handleModal();
    }
  };
  return (
    <>
      <Dialog open={dialog} maxWidth={"sm"}>
        <DialogTitle sx={{ bgcolor: "primary.main" }}>
          <Typography sx={{ fontWeight: "bold", color: "white" }}>
            Delete Faculty In Charge
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography mb={1} mt={4}>
              Are you sure to delete ?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleModal()} disabled={loading}>
            <Typography sx={{ textTransform: "capitalize" }}>Cancel</Typography>
          </Button>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={() => handleForm()}
          >
            <Typography sx={{ textTransform: "capitalize" }}>Delete</Typography>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteModal;
