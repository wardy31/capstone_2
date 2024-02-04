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
  Chip,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import HandshakeTwoToneIcon from "@mui/icons-material/HandshakeTwoTone";
import React from "react";

function Profile({ data }) {
  return (
    <>
      <Box
        display="flex"
        alignItems={"center"}
        columnGap={2}
        mt={4}
        mb={4}
        sx={{
          width: {
            xs: "100%",
            md: "43%",
          },
        }}
      >
        <Avatar
          variant="rounded"
          sx={{ height: 100, width: 100 }}
          src={`${import.meta.env.VITE_BE_COVER_HOST}${data.id}/upload1.jpg`}
        ></Avatar>
        <Box>
          <Box display={"flex"} columnGap={2}>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              Welcome
            </Typography>
          </Box>
          <Typography
            variant="h4"
            fontWeight={"bold"}
            color="primary"
          >{`${data.firstName} ${data.lastName}  `}</Typography>
          <Chip
            variant="outlined"
            color="primary"
            label={data?.role}
            sx={{ borderRadius: 1, textTransform: "capitalize" }}
          ></Chip>
        </Box>
      </Box>

      <Box
        sx={{
          width: {
            xs: "100%",
            md: "43%",
          },
          mb: 6,
        }}
      >
        <List
          component={Paper}
          sx={{
            boxShadow: 2,
          }}
          disablePadding
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "primary.main" }} variant="rounded">
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
    </>
  );
}
export default Profile;
