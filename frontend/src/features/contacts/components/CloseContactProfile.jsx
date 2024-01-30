import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import dateFormat from "../../../utils/moment";

function CloseContactProfile({ data: { user, dateInfected } }) {
  const navigate = useNavigate();
  return (
    <>
      <Box display={"flex"} columnGap={2} alignItems={"center"}>
        <Button
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIcon></ArrowBackIcon>}
          sx={{
            textTransform: "capitalize",
            letterSpacing: 1.2,
            borderRadius: 5,
            fontWeight: "bold",
          }}
          size="small"
          color="primary"
          variant="contained"
        >
          Return
        </Button>

        <Typography
          fontWeight={"bold"}
          variant="h5"
          letterSpacing={1.2}
        >{`${user?.firstName} ${user?.lastName}`}</Typography>

        <Typography fontWeight="bold">-</Typography>

        <Typography fontWeight={"bold"} variant="h5" letterSpacing={1.2}>
          {dateFormat(dateInfected)}
        </Typography>
      </Box>
    </>
  );
}

export default CloseContactProfile;
