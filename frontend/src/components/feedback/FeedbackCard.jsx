import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import TextsmsTwoToneIcon from "@mui/icons-material/TextsmsTwoTone";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import { useSelector } from "react-redux";
import store from "../../store/store";
import moment from "../../utils/moment";
import {
  getFeedback,
  deleteFeedback,
  addFeedback,
} from "../../store/actions/feedbackAction";
function FeedbackCard({ id }) {
  const { post, get, delete: del } = useSelector((state) => state.feedback);
  const { data } = useSelector((state) => state.user.auth);
  const [form, setForm] = useState({ comment: "" });

  const handleFeedback = async (selectedId = 0, key) => {
    switch (key) {
      case "post":
        const res = await store.dispatch(addFeedback(form, id));
        if (res) {
          setForm({ ...form, comment: "" });
        }
        break;
      case "delete":
        await store.dispatch(deleteFeedback(selectedId, id));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    store.dispatch(getFeedback(id));
  }, []);

  return (
    <Box component={Paper} sx={{ p: 2, borderRadius: 1, boxShadow: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography
          sx={{
            letterSpacing: 1.4,
            fontSize: 14,
            color: "text.primary",
            fontWeight: "bold",
          }}
        >
          Feedbacks
        </Typography>
      </Box>

      {data?.role === "faculty_in_charge" && (
        <FormControl
          size="small"
          color="primary"
          focused
          sx={{ my: 1 }}
          fullWidth
        >
          <OutlinedInput
            placeholder="Write a feedback"
            value={form.comment}
            sx={{ fontSize: 14 }}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => handleFeedback(0, "post")}
                >
                  <TextsmsTwoToneIcon color={"primary"} />
                </IconButton>
              </InputAdornment>
            }
          ></OutlinedInput>
        </FormControl>
      )}

      <Box mt={1} mb={2}>
        <List>
          {get.data.length ? (
            get.data.map((f, index) => (
              <>
                <ListItem disablePadding>
                  <ListItemText
                    primary={<Typography fontSize={13} letterSpacing={1.0}>{f.comment}</Typography>}
                    secondary={
                      <>
                        <Typography
                          fontSize={11}
                          display="inline"
                          sx={{ color: "text.secondary" }}
                        >
                          {f.user.firstName} {f.user.lastName}
                        </Typography>
                        <Typography
                          fontSize={11}
                          display="inline"
                          px={0.6}
                          sx={{ color: "text.secondary" }}
                        >
                          •
                        </Typography>
                        <Typography
                          fontSize={11}
                          display="inline"
                          sx={{ color: "text.secondary" }}
                        >
                          {moment(f.createdAt)}
                        </Typography>
                      </>
                    }
                  ></ListItemText>
                </ListItem>
                <Divider></Divider>
              </>
            ))
          ) : (
            <Typography fontSize={12} sx={{ color: "text.secondary" }}>
              No feedback yet.
            </Typography>
          )}
        </List>
      </Box>
    </Box>
  );
}

export default FeedbackCard;
