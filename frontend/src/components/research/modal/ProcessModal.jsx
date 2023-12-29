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
import {
  deleteResearch,
  changeResearchStatus,
} from "../../../store/actions/researchAction";
import { setDialog } from "../../../store/reducers/researchReducer";
import store from "../../../store/store";

function ProcessModal({ id }) {
  const { dialog, loading } = useSelector((state) => state.research.process);
  const dispatch = useDispatch();

  const handleModal = () => {
    dispatch(setDialog({ type: "process", payload: !dialog }));
  };

  const handleForm = async () => {
    const res = store.dispatch(changeResearchStatus(id, "processing"));
    if (res) {
      handleModal();
    }
  };
  return (
    <>
      <Dialog open={dialog} maxWidth={"sm"}>
        <DialogTitle sx={{ bgcolor: "primary.main" }}>
          <Typography sx={{ fontWeight: "bold", color: "white" }}>
            Processing Research
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography mb={1} mt={4}>
              Are you sure to process it again?
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
            <Typography sx={{ textTransform: "capitalize" }}>Submit</Typography>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProcessModal;
