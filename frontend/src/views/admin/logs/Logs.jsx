import React, { useEffect } from "react";
import LogsList from "../../../components/logs/LogsList";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Header from "../../../components/Header/Header";
import { useSelector } from "react-redux";
import store from "../../../store/store";
import { getLogs } from "../../../store/actions/userAction";
import moment, { time } from "../../../utils/moment";

function Logs() {
  const { data, loading } = useSelector((state) => state.user.logs);

  useEffect(() => {
    store.dispatch(getLogs());
  }, []);
  return (
    <Box sx={{ mx: 4 }}>
      <Header
        primary="Activity logs"
        secondary={"This is your admin logs"}
      ></Header>
      <Box mt={4}> </Box>

      <List dense>
        {data.map((m) => (
          <ListItem key={m.id} sx={{ bgcolor: "white" }}>
            <ListItemText
              primary={
                <>
                  <Typography
                    display={"inline"}
                    fontSize={14}
                    // fontWeight={"bold"}
                    textTransform={"capitalize"}
                    mr={0.8}
                  >
                    {m.user.firstName}
                  </Typography>
                  <Typography
                    display={"inline"}
                    fontSize={14}
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
                fontSize: 12,
                color: "text.disabled",
              }}
            ></ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Logs;
