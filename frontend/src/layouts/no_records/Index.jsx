import { Avatar, Box, Typography } from "@mui/material";
import image from "../../assets/database.png";
import React from "react";

function Index() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <Avatar src={image} sx={{height:60,width:60,mb:1}}></Avatar>
      <Typography variant={"subtitle2"} sx={{textTransform:"uppercase",fontWeight:"bold",letterSpacing:1.2}}>No data found</Typography>
    </Box>
  );
}

export default Index;
