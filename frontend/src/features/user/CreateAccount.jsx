import React from "react";
import Forms from "./components/Forms";
import { Box, Card, Container, Paper, Typography } from "@mui/material";
import { useFetch } from "../../hooks/useFetch";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
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
    <Box sx={{ bgcolor: "primary.main", py: 4 }}>
      <Card sx={{ width: "100vh", mx: "auto", py: 4, px: 8 }}>
        <Typography variant="h5" fontWeight={"bold"}>
          Create Account
        </Typography>
        <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
          Fill up all required fields*
        </Typography>
        <Forms></Forms>
      </Card>
    </Box>
  );
}

export default CreateAccount;
