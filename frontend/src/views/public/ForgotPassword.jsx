import {
  Avatar,
  Box,
  Button,
  Card,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import emailSent from "../../assets/mail_sent.png";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { submitEmailPassword } from "../../store/actions/userAction";
import store from "../../store/store";
import validate from "../../utils/validation";

function ForgotPassword() {
  const { loading, error } = useSelector((state) => state.user.emailPassword);
  const [email, setEmail] = useState();
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    const res = await store.dispatch(submitEmailPassword(email));
    if (res) {
      setSent(true);
    }
  };

  if (sent) {
    return (
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
        <Box sx={{ textAlign: "center" }}>
          <img style={{ height: 120, width: 120 }} src={emailSent}></img>
          {/* <Avatar sx={{height:120,width:120}} src={emailSent} variant="square"></Avatar> */}
          <Typography
            variant={"h6"}
            fontWeight="bold"
            letterSpacing={1.5}
            mt={1}
          >
            Email Sent!
          </Typography>
          <Typography
            variant={"caption"}
            color="text.secondary"
            mt={4}
            letterSpacing={1.5}
          >
            Please check the reset link on your email
          </Typography>
        </Box>
      </Card>
    );
  }
  return (
    <Card
      sx={{ width: 320, mx: "auto", my: "25vh", px: 4, py: 4, borderRadius: 2 }}
    >
      <Box>
        <Typography
          variant="h5"
          fontWeight="bold"
          letterSpacing={1.5}
          color="primary.main"
        >
          Forgot Password
        </Typography>
        <Typography variant="body2" color={"text.disabled"} mt={0.6}>
          Please enter the email you use to sign in and we will send you a reset
          link
        </Typography>
        <Typography variant="body2" color={"text.secondary"}></Typography>

        <Box sx={{ mb: 2, mt: 4 }}>
          <Typography variant="subtitle2" display={"inline"}>
            Email Address
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
            value={email}
            error={validate("email", error?.details)}
            helperText={validate("email", error?.details)}
            onChange={(e) => setEmail(e.target.value)}
            // error={Boolean(validate("username", error))}
            // helperText={validate("username", error)}
          ></TextField>
        </Box>

        <LoadingButton
          loading={loading}
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          <Typography
            textTransform="capitalize"
            letterSpacing={1.2}
            fontWeight={500}
          >
            Continue
          </Typography>
        </LoadingButton>
      </Box>
    </Card>
  );
}

export default ForgotPassword;
