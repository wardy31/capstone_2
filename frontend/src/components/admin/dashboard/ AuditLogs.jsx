import {
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import store from "../../../store/store";
import { getLogs } from "../../../store/actions/userAction";
import { useSelector } from "react-redux";
import moment,{time} from "../../../utils/moment";

function AuditLogs() {
  const { data, loading } = useSelector((state) => state.user.logs);
  useEffect(() => {
    store.dispatch(getLogs());
  }, []);
  return (
    <>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: "bold",
          letterSpacing: 1.5,
          mb: 2,
          color: "text.primary",
        }}
      >
        Activity Logs
      </Typography>
      <Paper sx={{ px: 2 }}>
        <Box>
          <List dense>
            {data.slice(0, 6).map((m) => (
              <>
                <ListItem key={m.id} sx={{ bgcolor: "white" }} disablePadding>
                  <ListItemText
                    primary={
                      <>
                        <Typography
                          display={"inline"}
                          fontSize={12}
                          // fontWeight={"bold"}
                          textTransform={"capitalize"}
                          mr={0.8}
                        >
                          {m.user.firstName}
                        </Typography>
                        <Typography
                          display={"inline"}
                          fontSize={12}
                          sx={{ color: "text.secondary" }}
                        >
                          {m.description}
                        </Typography>
                      </>
                    }
                    secondary={
                      <>
                        <Typography
                          sx={{
                            fontSize: 12,
                            color: "text.disabled",
                            display: "inline",
                          }}
                        >
                          {moment(m.createdAt)}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 12,
                            color: "text.disabled",
                            display: "inline",
                            mx: 1,
                          }}
                        >
                          {" "}
                          •
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 12,
                            color: "text.disabled",
                            display: "inline",
                          }}
                        >
                          {time(m.createdAt)}
                        </Typography>
                      </>
                    }
                    secondaryTypographyProps={{
                      fontSize: 10,
                      color: "text.disabled",
                      mt: 1,
                    }}
                  ></ListItemText>
                </ListItem>
                <Divider></Divider>
              </>
            ))}
          </List>
        </Box>
      </Paper>
    </>
  );
}

export default AuditLogs;
