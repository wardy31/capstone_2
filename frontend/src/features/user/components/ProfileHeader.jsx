import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
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
      <Box display={"flex"} alignItems={"center"} columnGap={2} mt={2} mb={4}>
        <Button
          onClick={() => navigate(-1)}
          size="large"
          color="primary"
          sx={{
            // bgcolor: "primary.main",
            // color: "white",
            borderRadius: 1,
          }}
          startIcon={
            <ArrowBackTwoToneIcon fontSize="small"></ArrowBackTwoToneIcon>
          }
        >
          <Typography
            textTransform={"uppercase"}
            variant="caption"
            fontWeight={"bold"}
            letterSpacing={1.5}
          >
            Go Back
          </Typography>
        </Button>
      </Box>

      <Box>
        <Box display={"flex"} alignItems="center" columnGap={4.5}>
          <Avatar
            variant="circular"
            sx={{ height: 140, width: 140 }}
            src={`${import.meta.env.VITE_BE_COVER_HOST}${data.id}/upload1.jpg`}
          ></Avatar>

          <Box>
            <Box mb={1.8} display={"flex"} columnGap={2.5}>
              <Typography variant="h5" fontWeight={"bold"}>
                {`${data.firstName} ${data.lastName}`}
              </Typography>
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

            <Box mt={2}>
              {data.InfectedUser.length && (
                <Chip
                  size="small"
                  label="Infected User"
                  sx={{
                    ".MuiChip-label": {
                      fontSize: 12,
                      letterSpacing: 1.2,
                      // fontWeight: "bold",
                    },
                    mr:1
                  }}
                  icon={<LabelTwoToneIcon></LabelTwoToneIcon>}
                  color="error"
                ></Chip>
              )}

              {data.ExposedUser.length && (
                <Chip
                  size="small"
                  label="Close Contact"
                  sx={{
                    ".MuiChip-label": {
                      fontSize: 12,
                      letterSpacing: 1.2,
                      // fontWeight: "bold",
                    },
                  }}
                  icon={<LabelTwoToneIcon></LabelTwoToneIcon>}
                  color="error"
                ></Chip>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProfileHeader;
