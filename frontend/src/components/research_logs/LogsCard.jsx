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
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import { useSelector } from "react-redux";
import store from "../../store/store";
import moment from "../../utils/moment";
import { getResearchLogs } from "../../store/actions/researchAction";

function LogsCard({ id }) {
  const { data, loading } = useSelector((state) => state.research.logs);

  useEffect(() => {
    store.dispatch(getResearchLogs(id));
  }, []);

  console.log("data", data);

  return (
    <Box component={Paper} sx={{ p: 2, borderRadius: 1, boxShadow: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          sx={{ letterSpacing: 1.2, fontWeight: "bold", fontSize: 14 }}
        >
          Research Logs
        </Typography>
      </Box>

      <Box mt={2} mb={2}>
        <List>
          {data.length ? (
            data.map((f, index) => (
              <>
                <ListItem disablePadding key={index}>
                  <ListItemText
                    primary={
                      <Typography fontSize={13} letterSpacing={1.0}>
                        research has been modified at{" "}
                        {moment(f.modifiedAt).toLowerCase()} by{" "}
                        {f.researchAuthor?.user?.firstName}
                        {f.researchAuthor?.user?.lastName}
                      </Typography>
                    }
                    // secondary={
                    //   <>
                    //     <Typography
                    //       fontSize={11}
                    //       display="inline"
                    //       sx={{ color: "text.secondary" }}
                    //     >
                    //       {f.researchAuthor?.user?.firstName}
                    //       {f.researchAuthor?.user?.lastName}
                    //     </Typography>
                    //     <Typography
                    //       fontSize={11}
                    //       display="inline"
                    //       px={0.6}
                    //       sx={{ color: "text.secondary" }}
                    //     >
                    //       •
                    //     </Typography>
                    //     <Typography
                    //       fontSize={11}
                    //       display="inline"
                    //       sx={{ color: "text.secondary" }}
                    //     >
                    //       {moment(f.createdAt)}
                    //     </Typography>
                    //   </>
                    // }
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

export default LogsCard;
