import { Button } from "@mui/material";
import SimCardDownloadTwoToneIcon from "@mui/icons-material/SimCardDownloadTwoTone";
import React from "react";

function DownloadButton({ onClick }) {
  return (
    <Button
    sx={{mt:2.4}}
      onClick={onClick}
      variant="contained"
      startIcon={<SimCardDownloadTwoToneIcon></SimCardDownloadTwoToneIcon>}
    >
      Download PDF
    </Button>
  );
}

export default DownloadButton;
