import {
  Box,
  Button,
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

function Forms() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.model.loadModel
  );
  const { faceResult: faceResult1, handleFaceDetection: handleFaceDetection1 } =
    useFace(false);
  const { faceResult: faceResult2, handleFaceDetection: handleFaceDetection2 } =
    useFace(false);

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
    const formData = new FormData();

    for (const key in state) {
      formData.append(key, state[key]);
    }

    await dispatch(createUser(formData));
  };

    useFetch(() => dispatch(getModel()));

    if (loading && !success) {
      return <></>;
    }

  return (
    <>
      <Box>
        <Typography>First Name</Typography>
        <TextField
          fullWidth
          size="small"
          value={state.firstName}
          onChange={(e) => handleChange(e.target.value, "firstName")}
        ></TextField>
      </Box>
      <Box>
        <Typography>Middle Name</Typography>
        <TextField
          fullWidth
          size="small"
          value={state.middleName}
          onChange={(e) => handleChange(e.target.value, "middleName")}
        ></TextField>
      </Box>
      <Box>
        <Typography>Last Name</Typography>
        <TextField
          fullWidth
          size="small"
          value={state.lastName}
          onChange={(e) => handleChange(e.target.value, "lastName")}
        ></TextField>
      </Box>
      <Box>
        <Typography>Gender</Typography>
        <Select
          fullWidth
          size="small"
          value={state.gender}
          onChange={(e) => handleChange(e.target.value, "gender")}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </Box>
      <Box>
        <Typography>Role</Typography>
        <Select
          fullWidth
          size="small"
          value={state.role}
          onChange={(e) => handleChange(e.target.value, "role")}
        >
          <MenuItem value="employee">Employee</MenuItem>
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="visitor">Visitor</MenuItem>
        </Select>
      </Box>
      <Box>
        <Typography>Department</Typography>
        <TextField
          fullWidth
          size="small"
          value={state.department}
          onChange={(e) => handleChange(e.target.value, "department")}
        ></TextField>
      </Box>
      <Box>
        <Typography>Address</Typography>
        <TextField
          fullWidth
          size="small"
          value={state.address}
          onChange={(e) => handleChange(e.target.value, "address")}
        ></TextField>
      </Box>
      <Box>
        <Typography>Vaccine Status</Typography>
        <Select
          fullWidth
          size="small"
          value={state.vaccineStatus}
          onChange={(e) => handleChange(e.target.value, "vaccineStatus")}
        >
          <MenuItem value="fully vaccinated">Fully Vaccinated</MenuItem>
          <MenuItem value="partial vaccinated">Partial Vaccinated</MenuItem>
          <MenuItem value="not vaccinated">Not Vaccinated</MenuItem>
        </Select>
      </Box>
      <Box>
        <Typography>Contact Number</Typography>
        <TextField
          fullWidth
          size="small"
          type="number"
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 12);
          }}
          value={state.contactNumber}
          onChange={(e) => handleChange(e.target.value, "contactNumber")}
        ></TextField>
      </Box>
      <Box>
        <Typography>Email</Typography>
        <TextField
          fullWidth
          size="small"
          value={state.email}
          onChange={(e) => handleChange(e.target.value, "email")}
        ></TextField>
      </Box>
      <Box>
        <Typography>Username</Typography>
        <TextField
          fullWidth
          size="small"
          value={state.username}
          onChange={(e) => handleChange(e.target.value, "username")}
        ></TextField>
      </Box>
      <Box>
        <Typography>Password</Typography>
        <TextInputPassword
          fullWidth
          size="small"
          value={state.password}
          onChange={(e) => handleChange(e.target.value, "password")}
        ></TextInputPassword>
      </Box>

      <Box>
        <Typography>Upload Image</Typography>
        <Box>
          <TextField
            fullWidth
            size="small"
            type="file"
            disabled={loading}
            inputProps={{ accept: "image/*" }}
            onChange={async (e) => {
              const formData = new FormData();
              formData.append("face", e.target.files[0]);
              await handleFaceDetection1(formData);
              if (faceResult1) {
                state.upload1 = e.target.files[0];
              }
            }}
          ></TextField>
          <TextField
            fullWidth
            size="small"
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={async (e) => {
              const formData = new FormData();
              formData.append("face", e.target.files[0]);
              await handleFaceDetection2(formData);
              if (faceResult2) {
                state.upload2 = e.target.files[0];
              }
            }}
          ></TextField>
        </Box>
      </Box>

      <Box>
        <Button fullWidth variant="contained" onClick={handleSubmit}>
          Create Account
        </Button>
        <Button fullWidth sx={{ color: "text.secondary" }}>
          Cancel
        </Button>
      </Box>
    </>
  );
}

export default Forms;
