import React from "react";
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
import formImage from "../../../../assets/form1.png";
import { Link, useNavigate } from "react-router-dom";

function CheckForm() {
  return (
    <Card
      sx={{
        width: {
          xs: "100%",
          md: "43%",
        },
      }}
    >
      <CardActionArea LinkComponent={Link} to="/user/form">
        <CardMedia
          component="img"
          image={formImage}
          style={{ objectFit: "cover", width: "100%", height: 120 }}
        />

        <CardContent>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography sx={{ fontWeight: "bold" }}>
              Declaration Form
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Fill up your health declaration form before entering the campus. *
            (required)
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CheckForm;
