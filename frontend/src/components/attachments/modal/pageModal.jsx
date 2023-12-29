import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
function pageModal({ open, onClose, handlePage, page }) {
  const [value, setValue] = useState(1);

  return (
    <Dialog open={open} onClose={() => onClose(false)} fullWidth maxWidth="xs">
      <DialogTitle sx={{ bgcolor: "primary.main", color: "white" }}>
        <Typography fontWeight={"bold"} letterSpacing={1.2}>
          Extract Text OCR
        </Typography>
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-label">Select Page</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Page"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          >
            {Array.apply(null, Array(page))
              .map((x, i) => i + 1)
              .map((page, i) => (
                <MenuItem value={page}> {page}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ mx: 2 }}>
        <Button variant="text" color="secondary" onClick={() => onClose(false)}>
          <Typography
            fontSize={14}
            textTransform={"capitalize"}
            fontWeight={"bold"}
          >
            Cancel
          </Typography>
        </Button>
        <Button variant="contained" onClick={() => handlePage(value)}>
          <Typography
            fontSize={14}
            textTransform={"capitalize"}
            fontWeight={"bold"}
          >
            Scan OCR
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default pageModal;
