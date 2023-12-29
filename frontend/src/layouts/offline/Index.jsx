import { Avatar, Box, Container, Typography } from "@mui/material";
import React from "react";
import img from "../../assets/offline.png";

function Index() {
  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <img height={140} width={140} src={img} alt={"ss"} srcset="" />
      <Typography mt={4} variant={"h6"} fontWeight={"bold"} color="primary.light" letterSpacing={1.5}>
        Offline Mode
      </Typography>
    </Box>
  );
}

export default Index;
