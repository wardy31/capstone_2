import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Card,
  CardContent,
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
import HandshakeTwoToneIcon from "@mui/icons-material/HandshakeTwoTone";

function UserHome() {
  const { data } = useSelector((state) => state.auth.getUser);
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
        <Box textAlign={"center"} my={4}>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Welcome
          </Typography>
          <Typography
            variant="h4"
            fontWeight={"bold"}
            color="primary"
          >{`${data.firstName} ${data.lastName}`}</Typography>
        </Box>
        <List
          component={Paper}
          sx={{ boxShadow: 2, width: 350 }}
          disablePadding
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "primary.main" }}>
                <HandshakeTwoToneIcon fontSize="medium"></HandshakeTwoToneIcon>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="No Contact"
              secondary="as of today"
              primaryTypographyProps={{ fontSize: 18, fontWeight: "bold" }}
            ></ListItemText>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}

export default UserHome;
