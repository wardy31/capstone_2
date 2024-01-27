import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import React from "react";
import dateFormat from "../../../utils/moment";

function StationLogsList({ data }) {
  return (
    <List component={Card}>
      {data.map(({ id, user, createdAt }) => (
        <ListItem key={id}>
          <ListItemText
            primary={`${user.firstName} ${user.lastName}`}
            secondary={dateFormat(createdAt)}
            primaryTypographyProps={{
              fontWeight: "bold",
              fontSize: 15,
            }}
            secondaryTypographyProps={{
              fontSize: 12,
            }}
          ></ListItemText>
          <Divider></Divider>
        </ListItem>
      ))}
    </List>
  );
}

export default StationLogsList;
