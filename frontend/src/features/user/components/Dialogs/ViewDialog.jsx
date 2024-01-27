import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

function ViewDialog({ open, data, handleClose }) {
  return (
    <Dialog open={open} maxWidth="xs" fullWidth={true} onClose={handleClose}>
      <DialogTitle sx={{ color: "white", bgcolor: "primary.main" }}>
        <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
          View Response
        </Typography>
      </DialogTitle>
      <DialogContent>
        {data?.map((a, i) => (
          <Box key={a.id} sx={{ mt: i == 0 ? 2 : 0 }}>
            <Typography>{`${i + 1}. ${a.questionnaire.title}`}</Typography>
            <Typography
              sx={{ color: "text.secondary", fontSize: 14 }}
            >{` ${a.questionnaire.subtitle}`}</Typography>
            <TextField
              sx={{ my: 2 }}
              value={a.answer}
              size="small"
              fullWidth
              InputProps={{ readOnly: true }}
            ></TextField>
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  );
}

export default ViewDialog;
