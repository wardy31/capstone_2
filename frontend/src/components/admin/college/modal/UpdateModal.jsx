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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCollege } from "../../../../store/actions/collegeAction";
import { setDialog } from "../../../../store/reducers/collegeReducer";
import store from "../../../../store/store";
import validate from "../../../../utils/validation";

function UpdateModal({ id, param }) {
  const { dialog, loading, error } = useSelector((state) => state.college.put);
  const [form, setForm] = useState({ name: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    setForm({ ...form, name: param?.name });
  }, [param]);

  const handleModal = () => {
    dispatch(setDialog({ type: "put", payload: !dialog }));
  };

  const handleForm = async () => {
    const res = await store.dispatch(updateCollege(id, form));
    if (res) {
      handleModal();
    }
  };
  return (
    <>
      <Dialog open={dialog} maxWidth={"sm"}>
        <DialogTitle sx={{ bgcolor: "primary.main" }}>
          <Typography sx={{ fontWeight: "bold", color: "white" }}>
            Update College
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography mb={1} mt={4}>
            Name
          </Typography>
          <TextField
            error={Boolean(validate("name", error))}
            helperText={validate("name", error)}
            size="small"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          ></TextField>
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
            <Typography sx={{ textTransform: "capitalize" }}>Update</Typography>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UpdateModal;
