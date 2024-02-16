import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Header from "../../../components/header/Header";
import { useSelector } from "react-redux";
import useForm from "../../../hooks/useForm";
import TextInputPassword from "../../../components/text/TextInputPassword";
import { onUpdatePassword, onUpdateProfile } from "../userThunks";
import notify from "../../../utils/toast";
import store from "../../../store/store";
import { getAuth } from "../../auth/authThunks";
import { LoadingButton } from "@mui/lab";

function UserProfile() {
  const { data } = useSelector((state) => state.auth.getUser);
  const { loading } = useSelector((state) => state.user.updateProfile);
  const { loading: loadingPassword } = useSelector(
    (state) => state.user.updatePassword
  );

  const { state: form, handleChange: handleForm } = useForm({
    ...data,
    password: "",
  });

  console.log("form", form);

  const onSubmitProfile = async () => {
    const res = await store.dispatch(onUpdateProfile(form));

    if (res) {
      notify("Profile updated");
      store.dispatch(getAuth());
    }
  };

  const onSubmitPassword = async () => {
    const res = await store.dispatch(onUpdatePassword(form));

    if (res) {
      notify("Password updated");
    }
  };

  return (
    <Container>
      <Header title={"User Profile"} hideButton={true}></Header>

      <Avatar
        sx={{ width: 110, height: 110, mt: 2 }}
        variant="rounded"
        src={`${import.meta.env.VITE_BE_COVER_HOST}${form?.id}/upload1.jpg`}
      >
        {" "}
      </Avatar>

      <Typography pt={2} pb={2}>
        Personal Information
      </Typography>

      <Grid container spacing={1.5}>
        <Grid item xs={12} md={4}>
          <Box>
            <Typography mb={0.5} variant="caption">
              First Name
            </Typography>
            <TextField
              value={`${form?.firstName}`}
              fullWidth
              sx={{ bgcolor: "white" }}
              size="small"
              onChange={(e) => handleForm(e.target.value, "firstName")}
            ></TextField>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box>
            <Typography mb={0.5} variant="caption">
              Middle Name
            </Typography>
            <TextField
              value={`${form?.middleName}`}
              fullWidth
              sx={{ bgcolor: "white" }}
              size="small"
              onChange={(e) => handleForm(e.target.value, "middleName")}
            ></TextField>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box>
            <Typography mb={0.5} variant="caption">
              Last Name
            </Typography>
            <TextField
              value={`${form?.lastName}`}
              fullWidth
              sx={{ bgcolor: "white" }}
              size="small"
              onChange={(e) => handleForm(e.target.value, "lastName")}
            ></TextField>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box>
            <Typography mb={0.5} variant="caption">
              Role
            </Typography>
            <FormControl fullWidth>
              <Select
                value={form?.role}
                size="small"
                sx={{ bgcolor: "white" }}
                onChange={(e) => handleForm(e.target.value, "role")}
              >
                <MenuItem value="visitor">Visitor</MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="employee">Employee</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        {form?.role != "visitor" && (
          <Grid item xs={12} md={4}>
            <Box>
              <Typography mb={0.5} variant="caption">
                Department
              </Typography>
              <TextField
                value={form?.department}
                fullWidth
                sx={{ bgcolor: "white" }}
                size="small"
                onChange={(e) => handleForm(e.target.value, "department")}
              ></TextField>
            </Box>
          </Grid>
        )}

        <Grid item xs={12} md={4}>
          <Box>
            <Typography mb={0.5} variant="caption">
              Gender
            </Typography>
            <FormControl fullWidth>
              <Select
                value={form?.gender}
                size="small"
                sx={{ bgcolor: "white" }}
                onChange={(e) => handleForm(e.target.value, "gender")}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box>
            <Typography mb={0.5} variant="caption">
              Email
            </Typography>
            <TextField
              value={form?.email}
              fullWidth
              sx={{ bgcolor: "white" }}
              size="small"
              onChange={(e) => handleForm(e.target.value, "email")}
            ></TextField>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box>
            <Typography mb={0.5} variant="caption">
              Contact Number
            </Typography>
            <TextField
              value={form?.contactNumber}
              fullWidth
              sx={{ bgcolor: "white" }}
              size="small"
              onChange={(e) => handleForm(e.target.value, "contactNumber")}
            ></TextField>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box>
            <Typography mb={0.5} variant="caption">
              Address
            </Typography>
            <TextField
              value={form?.address}
              fullWidth
              sx={{ bgcolor: "white" }}
              size="small"
              onChange={(e) => handleForm(e.target.value, "address")}
            ></TextField>
          </Box>
        </Grid>

        <Grid item>
          <Box>
            <Typography mb={0.5} variant="caption">
              Vaccination Status
            </Typography>
            <TextField
              value={form?.vaccineStatus}
              fullWidth
              sx={{ bgcolor: "white" }}
              size="small"
              onChange={(e) => handleForm(e.target.value, "vaccineStatus")}
            ></TextField>
          </Box>
        </Grid>
      </Grid>

      <LoadingButton
        loading={loading}
        onClick={onSubmitProfile}
        variant="contained"
        sx={{ my: 2 }}
      >
        Save Changes
      </LoadingButton>

      <Typography mt={2} mb={2}>
        Security Information
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Box>
            <Typography mb={0.5} variant="caption">
              Username
            </Typography>
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={form?.username}
              fullWidth
              sx={{ bgcolor: "white" }}
              size="small"
            ></TextField>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box>
            <Typography mb={0.5} variant="caption">
              Password
            </Typography>
            <TextInputPassword
              value={form?.password}
              size={"small"}
              bgcolor="white"
              onChange={(e) => handleForm(e.target.value, "password")}
            ></TextInputPassword>
          </Box>
        </Grid>
      </Grid>

      <LoadingButton
        loading={loadingPassword}
        variant="contained"
        sx={{ my: 2 }}
        onClick={onSubmitPassword}
      >
        Update Password
      </LoadingButton>
    </Container>
  );
}

export default UserProfile;
