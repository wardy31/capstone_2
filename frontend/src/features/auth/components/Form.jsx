import { Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React from "react";
import useForm from "../../../hooks/useForm";
import TextInputPassword from "../../../components/text/TextInputPassword";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../authThunks";
import validate from "../../../utils/validation";
import { Link, useNavigate } from "react-router-dom";
import toast from "../../../utils/toast";

function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state, handleChange } = useForm({ username: "", password: "" });
  const { loading, error } = useSelector((state) => state.auth.login);
  const { data } = useSelector((state) => state.auth.getUser);

  const handleLogin = async () => {
    const res = await dispatch(loginUser(state));
    if (res) {
      console.log(data.role);
      // const message = (data?.role == "clinic") ? "You are login as admin" : "Logged  In";
      console.log("message","Logged In");
      toast(message);
      navigate("/");
    }
  };

  return (
    <>
      <Box mb={2}>
        <Typography sx={{ fontSize: 14, mb: 0.5 }}>Username</Typography>

        <TextField
          sx={{ bgcolor: "primary.light" }}
          fullWidth
          value={state.username}
          onChange={(e) => handleChange(e.target.value, "username")}
          error={Boolean(validate("username", error))}
          helperText={validate("username", error)}
        ></TextField>
      </Box>

      <Box mb={2}>
        <Typography sx={{ fontSize: 14, mb: 0.5 }}>Password</Typography>
        <TextInputPassword
          error={Boolean(validate("password", error))}
          helperText={validate("password", error)}
          value={state.password}
          onChange={(e) => handleChange(e.target.value, "password")}
        ></TextInputPassword>
      </Box>

      <LoadingButton
        sx={{ mb: 0.5, py: 1.1 }}
        variant="contained"
        fullWidth
        loading={loading}
        onClick={handleLogin}
      >
        <Typography textTransform={"capitalize"}>Login </Typography>
      </LoadingButton>
      <Button
        sx={{ py: 1.1 }}
        fullWidth
        LinkComponent={Link}
        to="/create-account"
        variant="outlined"
      >
        <Typography textTransform={"capitalize"}>Create Account</Typography>
      </Button>
    </>
  );
}

export default Form;
