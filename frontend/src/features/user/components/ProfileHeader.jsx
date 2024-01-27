import { Avatar, Box, Chip, IconButton, Typography } from "@mui/material";
import React from "react";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LabelTwoToneIcon from "@mui/icons-material/LabelTwoTone";
import { useNavigate } from "react-router-dom";

function ProfileHeader({ data, loading }) {
  const navigate = useNavigate();
  console.log(data);

  if (loading) {
    return;
  }

  return (
    <>
      <Box display={"flex"} alignItems={"center"} columnGap={2} my={6}>
        <IconButton
          onClick={() => navigate(-1)}
          size="large"
          color="primary"
          sx={{
            bgcolor: "primary.main",
            color: "white",
            borderRadius: 1,
            ":hover": {
              bgcolor: "primary.main",
            },
          }}
        >
          <ArrowBackTwoToneIcon fontSize="inherit"></ArrowBackTwoToneIcon>
        </IconButton>
        <Typography
          textTransform={"uppercase"}
          variant="h5"
          fontWeight={"bold"}
          letterSpacing={1.5}
          color={"primary"}
        >
          User's Profile
        </Typography>
      </Box>

      <Box>
        <Box display={"flex"} alignItems="center" columnGap={4.5}>
          <Avatar
            variant="circular"
            sx={{ height: 140, width: 140 }}
            src="data:image/jpeg;base64,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"
          ></Avatar>

          <Box>
            <Box mb={1.8} display={"flex"} columnGap={2.5}>
              <Typography variant="h5" fontWeight={"bold"}>
                {`${data.firstName} ${data.lastName}`}
              </Typography>

              <Chip
                label="Close Contact"
                sx={{
                  ".MuiChip-label": {
                    fontSize: 12,
                    letterSpacing: 1.2,
                    fontWeight: "bold",
                  },
                }}
                icon={<LabelTwoToneIcon></LabelTwoToneIcon>}
                color="error"
              ></Chip>
            </Box>
            <Box sx={{ display: "flex", columnGap: 4.5 }}>
              <Box>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Role
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.primary" }}
                  textTransform={"capitalize"}
                >
                  {`${data.role}`}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Gender
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.primary" }}
                  textTransform={"capitalize"}
                >
                  {`${data.gender}`}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Email
                </Typography>
                <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                  {`${data.email}`}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Address
                </Typography>
                <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                  {`${data.address}`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProfileHeader;
