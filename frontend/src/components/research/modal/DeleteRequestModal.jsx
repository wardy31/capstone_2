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
import { changeResearchStatus } from "../../../store/actions/researchAction";
import { setDialog } from "../../../store/reducers/researchReducer";
import store from "../../../store/store";

function DeleteRequestModal({ id }) {
  const { dialog, loading } = useSelector((state) => state.research.status);
  const dispatch = useDispatch();

  const handleModal = () => {
    dispatch(setDialog({ type: "status", payload: !dialog }));
  };

  const handleForm = async () => {
    const res = store.dispatch(changeResearchStatus(id, "request_delete"));
    if (res) {
      handleModal();
    }
  };
  return (
    <>
      <Dialog open={dialog} maxWidth={"sm"}>
        <DialogTitle sx={{ bgcolor: "primary.main" }}>
          <Typography sx={{ fontWeight: "bold", color: "white" }}>
            Request Delete
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography mb={1} mt={4}>
              Request for deletion ?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleModal()} disabled={loading}>
            <Typography
              sx={{ textTransform: "capitalize", color: "text.disabled" }}
            >
              Cancel
            </Typography>
          </Button>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={handleForm}
          >
            <Typography sx={{ textTransform: "capitalize" }}>
              Request
            </Typography>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteRequestModal;
