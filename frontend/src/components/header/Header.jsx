import { Box, Button, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";

function Header({
  title,
  subTitle,
  actionButtons,
  addTitleButton,
  addHandleClick,
  hideButton = false,
  isBackButton = false,
  handleBackButton,
}) {
  return (
    <Box
      display={"flex"}
      justifyContent="space-between"
      alignItems={"center"}
      columnGap={2}
      mt={4}
    >
      {isBackButton && (
        <Button size="medium" variant="contained" onClick={handleBackButton}>
          <ArrowBackTwoToneIcon fontSize="large" />
        </Button>
      )}
      <Box>
        <Typography
          color={"primary"}
          sx={{
            fontSize: 24,
            fontWeight: "bold",
            textTransform: "capitalize",
            letterSpacing: 1.2,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", letterSpacing: 1.2 }}
        >
          {subTitle}
        </Typography>
      </Box>
      {!hideButton && (
        <Box>
          {actionButtons}
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            sx={{}}
            onClick={addHandleClick}
          >
            <Typography
              textTransform={"capitalize"}
              variant="button"
              letterSpacing={1.2}
            >
              {addTitleButton}
            </Typography>
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Header;
