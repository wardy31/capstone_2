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
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCollege } from "../../../../store/actions/collegeAction";
import { setDialog } from "../../../../store/reducers/collegeReducer";
import store from "../../../../store/store";
import AddIcon from "@mui/icons-material/Add";
import validate from "../../../../utils/validation";

function AddModal() {
  const { dialog, loading, error } = useSelector((state) => state.college.post);
  const [form, setForm] = useState({ name: "" });
  const dispatch = useDispatch();

  const handleModal = () => {
    dispatch(setDialog({ type: "post", payload: !dialog }));
  };

  const handleForm = async () => {
    const res = await store.dispatch(addCollege(form));
    if (res) {
      handleModal();
    }
  };
  return (
    <>
      <Box>
        <Button
          sx={{
            mb: 2,
            mt: {
              xs: 2,
              lg: 0,
            },
          }}
          size="small"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleModal()}
        >
          <Typography
            sx={{
              textTransform: "capitalize",
              py: 0.6,
              fontWeight: "bold",
              letterSpacing: 1,
              fontSize: 14,
            }}
          >
            College
          </Typography>
        </Button>
      </Box>
      <Dialog open={dialog} maxWidth={"sm"}>
        <DialogTitle sx={{ bgcolor: "primary.main" }}>
          <Typography sx={{ fontWeight: "bold", color: "white" }}>
            Add College
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography mb={1} mt={4}>
            College Name
          </Typography>
          <TextField
            size="small"
            fullWidth
            error={Boolean(validate("name", error))}
            helperText={validate("name", error)}
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
            <Typography sx={{ textTransform: "capitalize" }}>Add</Typography>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddModal;
