import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

function EditProfile({ data, open, handleClose ,handleUpdate}) {
  return (
    <Dialog>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Box mt={1}>
          <Typography mb={0.5} variant="caption">
            First Name
          </Typography>
          <TextField
            value={`${data.firstName}`}
            fullWidth
            sx={{ bgcolor: "white" }}
            size="small"
          ></TextField>
        </Box>

        <Box mt={1}>
          <Typography mb={0.5} variant="caption">
            Middle Name
          </Typography>
          <TextField
            value={`${data.middleName}`}
            fullWidth
            sx={{ bgcolor: "white" }}
            size="small"
          ></TextField>
        </Box>

        <Box mt={1}>
          <Typography mb={0.5} variant="caption">
            Last Name
          </Typography>
          <TextField
            value={`${data.lastName}`}
            fullWidth
            sx={{ bgcolor: "white" }}
            size="small"
          ></TextField>
        </Box>

        <Box mt={1}>
          <Typography mb={0.5} variant="caption">
            Role
          </Typography>
          <TextField
            value={data?.role}
            fullWidth
            sx={{ bgcolor: "white" }}
            size="small"
          ></TextField>
        </Box>

        {data?.role != "visitor" && (
          <Box mt={1}>
            <Typography mb={0.5} variant="caption">
              Department
            </Typography>
            <TextField
              value={data?.department}
              fullWidth
              sx={{ bgcolor: "white" }}
              size="small"
            ></TextField>
          </Box>
        )}

        <Box mt={1}>
          <Typography mb={0.5} variant="caption">
            Gender
          </Typography>
          <TextField
            value={data?.gender}
            fullWidth
            sx={{ bgcolor: "white" }}
            size="small"
          ></TextField>
        </Box>

        <Box mt={1}>
          <Typography mb={0.5} variant="caption">
            Email
          </Typography>
          <TextField
            value={data?.email}
            fullWidth
            sx={{ bgcolor: "white" }}
            size="small"
          ></TextField>
        </Box>

        <Box mt={1}>
          <Typography mb={0.5} variant="caption">
            Contact Number
          </Typography>
          <TextField
            value={data?.contactNumber}
            fullWidth
            sx={{ bgcolor: "white" }}
            size="small"
          ></TextField>
        </Box>

        <Box mt={1}>
          <Typography mb={0.5} variant="caption">
            Address
          </Typography>
          <TextField
            value={data?.address}
            fullWidth
            sx={{ bgcolor: "white" }}
            size="small"
          ></TextField>
        </Box>

        <Box mt={1}>
          <Typography mb={0.5} variant="caption">
            Vaccination Status
          </Typography>
          <TextField
            value={data?.vaccineStatus}
            fullWidth
            sx={{ bgcolor: "white" }}
            size="small"
          ></TextField>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfile;
