import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDepartment } from "../../../../store/actions/departmentAction";
import { getCollege } from "../../../../store/actions/collegeAction";
import { setDialog } from "../../../../store/reducers/departmentReducer";
import store from "../../../../store/store";

function UpdateModal({ id, param }) {
  const { dialog, loading } = useSelector((state) => state.department.put);
  const { data, loading: getLoading } = useSelector(
    (state) => state.college.get
  );
  //   const [form, setForm] = useState({
  //     name: "",
  //     collegeId: "",
  //   });
  const dispatch = useDispatch();

  useEffect(() => {
    setForm(param);
  }, [param]);

  useEffect(() => {
    store.dispatch(getCollege());
  }, []);

  const handleModal = () => {
    dispatch(setDialog({ type: "put", payload: !dialog }));
  };

  const handleForm = async () => {
    const res = store.dispatch(updateDepartment(id, form));
    if (res) {
      handleModal();
    }
  };
  return (
    <>
      <Dialog open={dialog} maxWidth={"sm"}>
        <DialogTitle sx={{ bgcolor: "primary.main" }}>
          <Typography sx={{ fontWeight: "bold", color: "white" }}>
            Add Department
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography mb={1} mt={4}>
            Department Name
          </Typography>
          <TextField
            size="small"
            fullWidth
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          ></TextField>
          <Typography mb={1} mt={2}>
            College
          </Typography>

          {data.length && (
            <FormControl fullWidth size="small">
              <Select
                value={form.collegeId}
                onChange={(e) => {
                  setForm({ ...form, collegeId: e.target.value });
                }}
              >
                {data.map((m) => (
                  <MenuItem value={m.id} key={m.id}>
                    {m.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
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

export default UpdateModal;
