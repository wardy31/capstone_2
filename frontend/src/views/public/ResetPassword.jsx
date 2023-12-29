import {
  Avatar,
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useSelector } from "react-redux";
import store from "../../store/store";
import { changePassword, verifyPassword } from "../../store/actions/userAction";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import validate from "../../utils/validation";

function ForgotPassword() {
  const [password, setPassword] = useState();
  const [token, setToken] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const { loading: changeLoading, error: changeError } = useSelector(
    (state) => state.user.changePassword
  );
  const { loading, error } = useSelector((state) => state.user.verifyPassword);
  const location = useLocation();
  const navigation = useNavigate();

  useEffect(() => {
    (async () => {
      const queryParams = new URLSearchParams(location.search);
      const queryValue = queryParams.get("token");
      setToken(queryValue);
      await store.dispatch(verifyPassword(queryValue));
    })();
  }, []);

  const handleSubmit = async () => {
    const res = await store.dispatch(changePassword(token, password));
    if (res) {
      console.log(res);
      navigation("/");
    }
  };

  if (loading) {
    return <></>;
  }

  return (
    <>
      {error ? (
        <>
          {" "}
          <Box sx={{ textAlign: "center", pt: 25 }}>
            {" "}
            <Typography
              variant="h5"
              fontWeight={"bold"}
              textTransform={1.5}
              color="primary"
            >
              Token is invalid
            </Typography>
          </Box>
        </>
      ) : (
        <Card
          sx={{
            width: 320,
            mx: "auto",
            my: "25vh",
            px: 4,
            py: 4,
            borderRadius: 2,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              letterSpacing={1.5}
              color="primary.main"
            >
              New Password
            </Typography>
            <Typography variant="body2" color={"text.disabled"} mt={0.6}>
              Please enter your new password
            </Typography>
            <Typography variant="body2" color={"text.secondary"}></Typography>

            <Box sx={{ mb: 2, mt: 4 }}>
              <Typography variant="subtitle2" display={"inline"}>
                Enter New Password
              </Typography>
              <Typography
                variant="subtitle2"
                color={"error"}
                display={"inline"}
                ml={0.6}
              >
                *
              </Typography>

              <FormControl
                fullWidth
                error={validate("password", changeError.details)}
              >
                <OutlinedInput
                  size="small"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                ></OutlinedInput>
                <FormHelperText>
                  {validate("password", changeError.details)}
                </FormHelperText>
              </FormControl>
            </Box>

            <LoadingButton
              loading={changeLoading}
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleSubmit}
            >
              <Typography textTransform="capitalize" letterSpacing={1.2}>
                Reset Password
              </Typography>
            </LoadingButton>
          </Box>
        </Card>
      )}
    </>
  );
}

export default ForgotPassword;
