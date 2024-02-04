import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Profile from "../components/user_home/Profile";
import CheckForm from "../components/user_home/CheckForm";

function UserHome() {
  const { data, loading } = useSelector((state) => state.auth.getUser);

  if (loading) {
    return <></>;
  }
  
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Profile data={data}></Profile>
        <CheckForm></CheckForm>
      </Box>
    </Container>
  );
}

export default UserHome;
