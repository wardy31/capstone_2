import { Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React from "react";
import useForm from "../../../hooks/useForm";
import TextInputPassword from "../../../components/text/TextInputPassword";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../authThunks";
import validate from "../../../utils/validation";
import { Link, useNavigate } from "react-router-dom";

function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { state, handleChange } = useForm({ username: "", password: "" });
  const { loading, data, error } = useSelector((state) => state.auth.login);

  const handleLogin = async () => {
    await dispatch(loginUser(state));
  };

  return (
    <>
      <Box>
        <Typography>Username</Typography>

        <TextField
          fullWidth
          value={state.username}
          onChange={(e) => handleChange(e.target.value, "username")}
          error={Boolean(validate("username", error))}
          helperText={validate("username", error)}
        ></TextField>
      </Box>

      <Box>
        <Typography>Password</Typography>
        <TextInputPassword
          error={Boolean(validate("password", error))}
          helperText={validate("password", error)}
          value={state.password}
          onChange={(e) => handleChange(e.target.value, "password")}
        ></TextInputPassword>
      </Box>

      <LoadingButton
        variant="contained"
        fullWidth
        loading={loading}
        onClick={handleLogin}
      >
        <Typography textTransform={"capitalize"}>Login Account</Typography>
      </LoadingButton>
      <Button fullWidth LinkComponent={Link} to="/create-account">
        <Typography textTransform={"capitalize"} >Create Account</Typography>
      </Button>
    </>
  );
}

export default Form;
