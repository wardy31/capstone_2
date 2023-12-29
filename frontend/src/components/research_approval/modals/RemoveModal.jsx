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
  changeResearchStatus,
  updateResearchStatus,
} from "../../../store/actions/researchAction";
import { setDialog } from "../../../store/reducers/researchReducer";
import store from "../../../store/store";

function RemoveModal({ id, status, deleteModal, handleDeleteModal }) {
  const { loading } = useSelector((state) => state.research.delete_request);
  const dispatch = useDispatch();

  const handleForm = async () => {
    const res = await store.dispatch(updateResearchStatus(id, status));
    if (res) {
      handleDeleteModal(false);
    }
  };
  return (
    <>
      <Dialog open={deleteModal} maxWidth={"sm"}>
        <DialogTitle sx={{ bgcolor: "primary.main" }}>
          <Typography sx={{ fontWeight: "bold", color: "white" }}>
            {status ? "Delete Paper" : "Recover Paper"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography mb={1} mt={4}>
              {status
                ? "Are you sure to delete this paper?"
                : "Are you sure to recover this paper?"}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDeleteModal(false)} disabled={loading}>
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
              {status ? "Delete" : "Recover"}
            </Typography>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RemoveModal;
