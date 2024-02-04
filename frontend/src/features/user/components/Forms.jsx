import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import TextInputPassword from "../../../components/text/TextInputPassword";
import useForm from "../../../hooks/useForm";
import { getModel, postDetectFace } from "../../models/modelThunks";
import { useSelector, useDispatch } from "react-redux";
import { useFetch } from "../../../hooks/useFetch";
import useFace from "../hooks/useFace";
import { createUser } from "../userThunks";
import { Link, useNavigate } from "react-router-dom";
import toast from "../../../utils/toast";
import Progress from "../../../components/progress/Progress";
import { LoadingButton } from "@mui/lab";
import validate from "../../../utils/validation";

function Forms() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createUser: postUser } = useSelector((state) => state.user);
  const { loading, success, error } = useSelector(
    (state) => state.model.loadModel
  );
  const {
    faceResult: faceResult1,
    handleFaceDetection: handleFaceDetection1,
    loading: loadingFace1,
    error: face1Error,
    handleError: handleFace1Error,
  } = useFace(false);
  const {
    faceResult: faceResult2,
    handleFaceDetection: handleFaceDetection2,
    loading: loadingFace2,
    error: face2Error,
    handleError: handleFace2Error,
  } = useFace(false);

  const { state, handleChange } = useForm({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    role: "",
    department: "",
    address: "",
    vaccineStatus: "",
    contactNumber: "",
    email: "",
    username: "",
    password: "",
    upload1: "",
    upload2: "",
  });

  const handleSubmit = async () => {
    handleFace1Error(false);
    handleFace2Error(false);
    const formData = new FormData();

    for (const key in state) {
      formData.append(key, state[key]);
    }

    const res = await dispatch(createUser(formData));
    if (res) {
      toast("User Successfully Created");
    }
  };

  useFetch(() => dispatch(getModel()));

  if (loading && !success) {
    return <Progress message={"Loading Models ..."} xs={"caption"} md={"h6"} size={40}></Progress>;
  }

  return (
    <>
      <Typography mt={2}>Personal Information</Typography>
      <Box mt={1}>
        <Typography variant="caption">First Name</Typography>
        <TextField
          sx={{ bgcolor: "primary.light" }}
          error={Boolean(validate("firstName", postUser.error))}
          helperText={validate("firstName", postUser.error)}
          fullWidth
          size="small"
          value={state.firstName}
          onChange={(e) => handleChange(e.target.value, "firstName")}
        ></TextField>
      </Box>
      <Box mt={1}>
        <Typography variant="caption">Middle Name</Typography>
        <TextField
          sx={{ bgcolor: "primary.light" }}
          error={Boolean(validate("middleName", postUser.error))}
          helperText={validate("middleName", postUser.error)}
          fullWidth
          size="small"
          value={state.middleName}
          onChange={(e) => handleChange(e.target.value, "middleName")}
        ></TextField>
      </Box>
      <Box mt={1}>
        <Typography variant="caption">Last Name</Typography>
        <TextField
          sx={{ bgcolor: "primary.light" }}
          error={Boolean(validate("lastName", postUser.error))}
          helperText={validate("lastName", postUser.error)}
          fullWidth
          size="small"
          value={state.lastName}
          onChange={(e) => handleChange(e.target.value, "lastName")}
        ></TextField>
      </Box>
      <Box mt={1}>
        <Typography variant="caption">Gender</Typography>
        <FormControl
          error={Boolean(validate("gender", postUser.error))}
          fullWidth
        >
          <Select
            sx={{ bgcolor: "primary.light" }}
            fullWidth
            size="small"
            value={state.gender}
            onChange={(e) => handleChange(e.target.value, "gender")}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
          <FormHelperText>{validate("gender", postUser.error)}</FormHelperText>
        </FormControl>
      </Box>
      <Box mt={1}>
        <Typography variant="caption">Role</Typography>
        <FormControl
          error={Boolean(validate("role", postUser.error))}
          fullWidth
        >
          <Select
            sx={{ bgcolor: "primary.light" }}
            fullWidth
            size="small"
            value={state.role}
            onChange={(e) => handleChange(e.target.value, "role")}
          >
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="visitor">Visitor</MenuItem>
          </Select>

          <FormHelperText>{validate("role", postUser.error)}</FormHelperText>
        </FormControl>
      </Box>
      {state.role != "visitor" && (
        <Box mt={1}>
          <Typography variant="caption">Department</Typography>
          <TextField
            sx={{ bgcolor: "primary.light" }}
            error={Boolean(validate("department", postUser.error))}
            helperText={validate("department", postUser.error)}
            fullWidth
            size="small"
            value={state.department}
            onChange={(e) => handleChange(e.target.value, "department")}
          ></TextField>
        </Box>
      )}
      <Box mt={1}>
        <Typography variant="caption">Address</Typography>
        <TextField
          sx={{ bgcolor: "primary.light" }}
          error={Boolean(validate("address", postUser.error))}
          helperText={validate("address", postUser.error)}
          fullWidth
          size="small"
          value={state.address}
          onChange={(e) => handleChange(e.target.value, "address")}
        ></TextField>
      </Box>
      <Box mt={1}>
        <Typography variant="caption">Vaccine Status</Typography>
        <FormControl
          fullWidth
          error={Boolean(validate("vaccineStatus", postUser.error))}
        >
          <Select
            sx={{ bgcolor: "primary.light" }}
            fullWidth
            size="small"
            value={state.vaccineStatus}
            onChange={(e) => handleChange(e.target.value, "vaccineStatus")}
          >
            <MenuItem value="fully vaccinated">Fully Vaccinated</MenuItem>
            <MenuItem value="partial vaccinated">Partial Vaccinated</MenuItem>
            <MenuItem value="not vaccinated">Not Vaccinated</MenuItem>
          </Select>

          <FormHelperText>
            {validate("vaccineStatus", postUser.error)}
          </FormHelperText>
        </FormControl>
      </Box>
      <Box mt={1}>
        <Typography variant="caption">Contact Number</Typography>
        <TextField
          sx={{ bgcolor: "primary.light" }}
          error={Boolean(validate("contactNumber", postUser.error))}
          helperText={validate("contactNumber", postUser.error)}
          fullWidth
          size="small"
          type="number"
          // onInput={(e) => {
          //   e.target.value = Math.max(0, parseInt(e.target.value))
          //     .toString()
          //     .slice(0, 12);
          // }}
          value={state.contactNumber}
          onChange={(e) => handleChange(e.target.value, "contactNumber")}
        ></TextField>
      </Box>
      <Box mt={1}>
        <Typography variant="caption">Email</Typography>
        <TextField
          sx={{ bgcolor: "primary.light" }}
          error={Boolean(validate("email", postUser.error))}
          helperText={validate("email", postUser.error)}
          fullWidth
          size="small"
          value={state.email}
          onChange={(e) => handleChange(e.target.value, "email")}
        ></TextField>
      </Box>
      <Box mt={1}>
        <Typography variant="caption">Username</Typography>
        <TextField
          sx={{ bgcolor: "primary.light" }}
          error={Boolean(validate("username", postUser.error))}
          helperText={validate("username", postUser.error)}
          fullWidth
          size="small"
          value={state.username}
          onChange={(e) => handleChange(e.target.value, "username")}
        ></TextField>
      </Box>
      <Box mt={1}>
        <Typography variant="caption">Password</Typography>
        <TextInputPassword
          error={Boolean(validate("password", postUser.error))}
          helperText={validate("password", postUser.error)}
          fullWidth
          size="small"
          value={state.password}
          onChange={(e) => handleChange(e.target.value, "password")}
        ></TextInputPassword>
      </Box>

      <Typography mt={2}>Upload Image</Typography>
      <Box mt={1}>
        <Typography mt={1} variant="caption">
          Image 1
        </Typography>

        <Box>
          <TextField
            sx={{ bgcolor: "primary.light" }}
            error={
              Boolean(validate("upload1", postUser.error)) ||
              Boolean(face1Error)
            }
            helperText={
              Boolean(face1Error)
                ? "No Face Detected"
                : validate("upload1", postUser.error)
            }
            fullWidth
            size="small"
            type="file"
            disabled={loadingFace1}
            inputProps={{ accept: "image/*" }}
            onChange={async (e) => {
              const formData = new FormData();
              formData.append("face", e.target.files[0]);
              const res = await handleFaceDetection1(formData);
              if (res) {
                state.upload1 = e.target.files[0];
              } else {
                handleFace1Error(true);
                state.upload1 = "";
                e.target.value = null;
              }
            }}
          ></TextField>
        </Box>

        <Box mt={1}>
          <Typography mt={1} variant="caption">
            Image 2
          </Typography>
          <TextField
            sx={{ bgcolor: "primary.light" }}
            error={
              Boolean(validate("upload2", postUser.error)) ||
              Boolean(face2Error)
            }
            helperText={
              Boolean(face2Error)
                ? "No Face Detected"
                : validate("upload2", postUser.error)
            }
            fullWidth
            size="small"
            type="file"
            disabled={loadingFace2}
            inputProps={{ accept: "image/*" }}
            onChange={async (e) => {
              const formData = new FormData();
              formData.append("face", e.target.files[0]);
              const res = await handleFaceDetection2(formData);
              if (res) {
                state.upload2 = e.target.files[0];
              } else {
                handleFace2Error(true);
                state.upload2 = "";
                e.target.value = null;
              }
            }}
          ></TextField>
        </Box>
      </Box>

      <Box mt={2}>
        <LoadingButton
          sx={{ textTransform: "capitalize" }}
          loading={createUser?.loading}
          fullWidth
          variant="contained"
          onClick={handleSubmit}
        >
          Create Account
        </LoadingButton>
        <Button
          fullWidth
          sx={{ mt: 1, color: "text.secondary", textTransform: "capitalize" }}
          LinkComponent={Link}
          to="/login"
        >
          Cancel
        </Button>
      </Box>
    </>
  );
}

export default Forms;
