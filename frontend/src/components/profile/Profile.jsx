import {
  Box,
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

function Profile() {
  return (
    <Box py={4}>
      <Box>
        <Typography
          variant="h6"
          sx={{ letterSpacing: 1.5, fontWeight: "bold" }}
        >
          Edit Profile
        </Typography>

        <Box mt={4}>
          <Typography
            sx={{ my: 2, fontWeight: "bold", color: "primary.light" }}
            variant="body1"
          >
            Account Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Full Name
                </Typography>
                <TextField variant="outlined" size="small"></TextField>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Contact No.
                </Typography>
                <TextField variant="outlined" size="small"></TextField>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Email
                </Typography>
                <TextField variant="outlined" size="small"></TextField>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 0.5 }}
                  inputProps={{ disabled: true }}
                >
                  Role
                </Typography>
                <TextField variant="outlined" size="small"></TextField>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  College
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  inputProps={{ disabled: true }}
                ></TextField>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Department
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  inputProps={{ disabled: true }}
                ></TextField>
              </Box>
            </Grid>
          </Grid>
          <Button variant="contained">
            <Typography sx={{ textTransform: "capitalize" }}>
              Save Changes
            </Typography>
          </Button>
        </Box>
      </Box>

      <Box mt={4}>
        <Typography
          sx={{ my: 2, fontWeight: "bold", color: "primary.light" }}
          variant="body1"
        >
          Security Information
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
            Username
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            inputProps={{ disabled: true }}
          ></TextField>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
            Password
          </Typography>
          <TextField variant="outlined" size="small"></TextField>
        </Box>

        <Button variant="contained">
          <Typography sx={{ textTransform: "capitalize" }}>
            Change Password
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default Profile;
