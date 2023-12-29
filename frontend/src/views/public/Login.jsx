import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Collapse,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../../store/store";
import { loginUser, getUser } from "../../store/actions/userAction";
import validate from "../../utils/validation";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo from "../../../public/title.png";

function Login() {
  const { loading, error } = useSelector((state) => state.user.login);
  const { loading: authLoading } = useSelector((state) => state.user.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  console.log(import.meta.env.MODE);
  useEffect(() => {
    (async () => {
      if (localStorage.getItem("token")) {
        try {
          setAlert(false);
          const res = await store.dispatch(getUser());
          console.log(res?.isValidate);
          switch (res?.isValidate) {
            case true:
              if (res.role == "student") {
                navigate(`/${res.role}/home`);
              }
              if (res.role == "faculty" || res.role == "faculty_in_charge") {
                navigate(`/faculty/home`);
              }
              if (res.role == "admin") {
                navigate(`/admin/dashboard`);
              }
              break;
            default:
              navigate("/");
              break;
          }
        } catch (error) {
          navigate("/");
          if (navigator.onLine) {
            navigate("/my");
          }
        }
      }
    })();
  }, []);

  // Ma use pa kun is Validated na
  const handleLogin = async () => {
    setAlert(false);

    const res = await store.dispatch(loginUser(form));

    switch (res.isValidate) {
      case "approve":
        if (res.role == "student") {
          navigate(`/${res.role}/home`);
        }
        if (res.role == "faculty" || res.role == "faculty_in_charge") {
          navigate(`/faculty/home`);
        }
        if (res.role == "admin") {
          navigate(`/admin/dashboard`);
        }
        break;
      case "pending_approval":
        if (!res.emailConfirmed) {
          setAlert("email");
          break;
        }
        setAlert("pending_approval");
        break;
      case "decline":
        setAlert("decline");
        break;
      default:
        // navigate("/");
        break;
    }
  };

  const handleChange = async (data, type) => {
    setForm({ ...form, [type]: data });
  };

  if (authLoading) {
    return <></>;
  }

  return (
    <Container maxWidth="xs">
      <Box textAlign={"center"} sx={{ pt: 4 }}>
        {/* <Typography
            display="inline"
            fontSize={22}
            fontWeight={"bold"}
            color={"text.primary"}
            letterSpacing={2.0}
            mr={1}
          >
            Welcome to
          </Typography> */}
        <Box display="flex" justifyContent={"center"}>
          <Avatar
            src={logo}
            variant="square"
            sx={{ width: 150, height: "auto" }}
          ></Avatar>
        </Box>

        <Typography
          fontSize={14}
          sx={{ color: "text.secondary" }}
          mt={2}
          textAlign={"center"}
        >
          Your journey to organized, accessible, and safe document storage
          begins here. Explore, retrieve, and manage your files effortlessly
        </Typography>
      </Box>
      <Card
        sx={{
          mt: 4,
          px: {
            xs: 2,
            lg: 5,
          },
          py: 3,
          borderRadius:3
        }}
        variant="elevation"
        elevation={4}
      >
        <Box sx={{}}>
          <Typography
            sx={{
              color: "text.primary",
              fontWeight: "bold",
              fontSize: 16,
              letterSpacing: 1.2,
            }}
          >
            Login Account
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              mb: 4,
              color: "text.secondary",
            }}
          >
            * provide login information
          </Typography>

          <Collapse in={alert == "email"}>
            <Alert severity="error">Check your email for confirmation.</Alert>
          </Collapse>

          <Collapse in={alert == "pending_approval"}>
            <Alert severity="error">Your account is not approved yet!</Alert>
          </Collapse>

          <Collapse in={alert == "decline"}>
            <Alert severity="error">
              Your account has been declined! Please ask your respective
              faculty.
            </Alert>
          </Collapse>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" display={"inline"}>
              Username
            </Typography>
            <Typography
              variant="subtitle2"
              color={"error"}
              display={"inline"}
              ml={0.6}
            >
              *
            </Typography>
            <TextField
              size="small"
              color="primary"
              fullWidth
              value={form.username}
              onChange={(e) => handleChange(e.target.value, "username")}
              error={Boolean(validate("username", error))}
              helperText={validate("username", error)}
            ></TextField>
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              display={"inline"}
              // color="text.secondary"
            >
              Password
            </Typography>
            <Typography
              variant="subtitle2"
              color={"error"}
              display={"inline"}
              ml={0.6}
            >
              *
            </Typography>

            <FormControl fullWidth error={Boolean(validate("password", error))}>
              <OutlinedInput
                size="small"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => handleChange(e.target.value, "password")}
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
              <FormHelperText>{validate("password", error)}</FormHelperText>
            </FormControl>
          </Box>

          <Box sx={{ mt: 1 }}>
            <LoadingButton
              loading={loading}
              variant="contained"
              color="primary"
              size="small"
              fullWidth
              onClick={() => {
                handleLogin();
              }}
            >
              <Typography
                sx={{
                  letterSpacing: 2,
                  textTransform: "capitalize",
                  fontSize: 14,
                  py: 0.6,
                }}
              >
                Login
              </Typography>
            </LoadingButton>

            <Grid container mt={2}>
              <Grid item xs display={"flex"} justifyContent={"start"}>
                <Button
                  size="small"
                  variant="outlined"
                  fullWidth
                  sx={{
                  }}
                  onClick={() => navigate("/create-account")}
                >
                  <Typography
                    sx={{
                      color: "text.primary",
                      // letterSpacing: 2,
                      textTransform: "capitalize",
                      fontSize: 12,
                      py:0.5,
                      // textDecoration: "underline",
                    }}
                  >
                    Create Account
                  </Typography>
                </Button>
              </Grid>
              <Divider orientation="vertical" flexItem sx={{px:1}}></Divider>
              <Grid item xs display={"flex"} justifyContent={"end"}>
                <Button
                  size="small"
                  fullWidth
                  sx={{ color: "text.primary" }}
                  onClick={() => navigate("/forgot-password")}
                >
                  <Typography textTransform="capitalize" fontSize={12}>
                    Forgot Password ?
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}

export default Login;
