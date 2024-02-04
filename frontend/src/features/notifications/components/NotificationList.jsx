import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import React from "react";
import dateFormat, { time } from "../../../utils/moment";

function NotificationList({ data, loading }) {
  console.log(data);
  if (loading) {
    return <></>;
  }

  return (
    <Paper sx={{ py: 2, px: 2 }}>
      <List disablePadding>
        {data.map((m) => (
          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography
                    display={"inline"}
                    fontWeight={"bold"}
                    color="error"
                  >{`${m.user.firstName} ${m.user.lastName}`}</Typography>
                  <Typography display={"inline"} mx={1}>entered at</Typography>
                  <Typography display={"inline"} textTransform={"uppercase"} fontWeight={"bold"}>{m.station.name}</Typography>
                </>
              }
              secondary={`${dateFormat(m.createdAt)} • ${time(m.createdAt)}`}
            ></ListItemText>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default NotificationList;
