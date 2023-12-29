import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDialog } from "../../../store/reducers/researchReducer";
import moment from "../../../utils/moment";
import ClearTwoToneIcon from "@mui/icons-material/ClearTwoTone";
import FeedbackCard from "../../feedback/FeedbackCard";
import LogsCard from "../../research_logs/LogsCard";
import Attachment from "../../attachments/Index";

function LogsModal({ params }) {
  const [form, setForm] = useState(params);
  const { dialog } = useSelector((state) => state.research.view);
  const dispatch = useDispatch();
  useEffect(() => {
    setForm(params);
  }, [params]);

  const joinUser = () => {
    if (params) {
      const users = params?.researchAuthors
        ?.filter((f) => f.user.role != "admin")
        .map(
          (researchAuthor) =>
            `${
              researchAuthor.user.firstName
            } ${researchAuthor.user.middleName.slice(
              0,
              1
            )}${researchAuthor.user.middleName.slice(0, 1)}${
              researchAuthor.user.middleName ? "." : ""
            } ${researchAuthor.user.lastName}`
        );
      return users;
    }

    return "";
  };

  const handleClose = () => {
    dispatch(setDialog({ payload: !dialog, type: "view" }));
  };

  if (!params) {
    return <></>;
  }
  return (
    <Dialog
      sx={{ ".MuiDialog-paper": { bgcolor: "#f0f0f0" } }}
      open={dialog}
      onClose={() => handleClose()}
      fullScreen
      maxWidth="sm"
      fullWidth="auto"
    >
      <DialogTitle
        sx={{ display: "flex", bgcolor: "primary.main" }}
        height={30}
      >
        <Typography sx={{ color: "white", fontWeight: "bold" }}>
          View Research
        </Typography>
        <Box flexGrow={1}></Box>
        <IconButton
          size="large"
          sx={{ color: "white" }}
          onClick={() => handleClose()}
        >
          <ClearTwoToneIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={4}>
          <Grid item xs={12} lg={9}>
            <Card sx={{ borderRadius: 1 }} elevation={4}>
              <CardHeader
                title={form?.title}
                titleTypographyProps={{
                  fontWeight: "bold",
                  fontSize: 20,
                  textTransform: "capitalize",
                  color: "primary.main",
                }}
                subheader={
                  <>
                    <Typography display="inline" fontSize={13}>
                      {form?.keyIdentifier}
                    </Typography>
                    <Typography display="inline" fontSize={13} px={0.6}>
                      •
                    </Typography>
                    <Typography display="inline" fontSize={13}>
                      {moment(form?.createdAt)}
                    </Typography>
                  </>
                }
              ></CardHeader>

              <CardContent>
                <Box>
                  <Typography sx={{ wordWrap: "break-word", fontSize: 15 }}>
                    {form?.abstract}
                  </Typography>
                </Box>

                <Box sx={{ my: 5 }}>
                  <Typography
                    sx={{
                      fontSize: 14,
                      wordWrap: "break-word",
                      mb: 1,
                      textTransform: "capitalize",
                    }}
                  >
                    Uploaded By :
                  </Typography>
                  {typeof joinUser() == "object" &&
                    joinUser().map((m, i) => (
                      <Typography
                        fontSize={14}
                        key={i}
                        letterSpacing={1.1}
                        sx={{ color: "text.secondary" }}
                      >
                        {m}
                      </Typography>
                    ))}

                  <Typography
                    sx={{ fontSize: 14, wordWrap: "break-word", mt: 2 }}
                  >
                    Paper Type :
                  </Typography>
                  <Typography
                    fontSize={14}
                    letterSpacing={1.1}
                    sx={{ color: "text.secondary" }}
                  >
                    {params?.paperType}
                  </Typography>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ fontSize: 14 }}>Attachment :</Typography>
                  <Attachment form={form} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FeedbackCard id={params?.id} />
              </Grid>
              <Grid item xs={12}>
                <LogsCard id={params?.id} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default LogsModal;
