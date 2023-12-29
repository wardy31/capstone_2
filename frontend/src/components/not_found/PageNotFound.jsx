import { Avatar, Box, Container } from "@mui/material";
import React from "react";
import img from "../../assets/page_not_found.svg";

function PageNotFound() {
  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img height={"50%"} width={"50%"} src={img} alt={"ss"} srcset="" />
    </Box>
  );
}

export default PageNotFound;
