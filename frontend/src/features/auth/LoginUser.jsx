import {
  Box,
  Card,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Form from "./components/Form";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSerializableStateInvariantMiddleware } from "@reduxjs/toolkit";
import useAuth from "../../hooks/useAuth";
import bgImage from "../../assets/coverLnu.png";

function LoginUser() {
  const navigate = useNavigate();
  const isAuth = useAuth();

  useFetch(() => {
    if (isAuth) {
      navigate("/");
      return;
    }
  });

  if (isAuth) {
    return <></>;
  }

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        width: "100%",
        position: "relative",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Typography
          textAlign={"center"}
          sx={{
            fontWeight: "bold",
            color: "white",
            letterSpacing: 1.2,
            fontSize: { xs: 22, md: 48 },
          }}
        >
          Leyte Normal University
        </Typography>
        <Typography
          textAlign={"center"}
          sx={{
            fontWeight: "bold",
            letterSpacing: 1.2,
            color: "white",
            fontSize: { xs: 18, md: 28 },
            mb: 4,
          }}
        >
          Contact Tracing Online
        </Typography>
        <Card
          sx={{
            width: {
              xs: 320,
            },
            borderRadius: 2,
            px: 4,
            py: 4,
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              letterSpacing: 1.2,
              fontWeight: "bold",
              mb: 2,
              color: "primary.main",
            }}
          >
            Login Account
          </Typography>
          <Form></Form>
        </Card>
      </Box>
    </Box>
  );
}

export default LoginUser;
