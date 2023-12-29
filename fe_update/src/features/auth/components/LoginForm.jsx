import {
  Box,
  Button,
  Card,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import formChange from "../../../hooks/formChange";
import LoadingButton from "@mui/lab/LoadingButton";

function LoginForm() {
  const [state, handleChange] = formChange({ username: "", password: "" });

  console.log(state);

  return (
    <>
      <Card>
        <Box>
          <Typography letterSpacing={1.2}>Username</Typography>
          <FormControl fullWidth>
            <TextField size="small"></TextField>
          </FormControl>
        </Box>

        <Box mt={2}>
          <Typography letterSpacing={1.2}>Password</Typography>
          <FormControl fullWidth>
            <TextField size="small"></TextField>
          </FormControl>
        </Box>

        <LoadingButton
          sx={{ textTransform: "capitalize", mt: 2 }}
          fullWidth
          variant="contained"
        >
          <Typography letterSpacing={1.2}>Login</Typography>
        </LoadingButton>
      </Card>
    </>
  );
}

export default LoginForm;
