import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import React from "react";
import dateFormat from "../../../utils/moment";

function ListData({ title, data, isContacts }) {
  return (
    <>
      <Typography
        sx={{ color: "text.secondary", mb: 1, mt: isContacts ? 3 : 0 }}
      >
        {title}
      </Typography>
      {isContacts == false ? (
        <List dense disablePadding component={Paper}>
          {data.length ? (
            data.map((m) => (
              <ListItem key={m.id}>
                <ListItemText
                  primaryTypographyProps={{
                    textTransform: "capitalize",
                  }}
                  primary={`${m.station?.name} `}
                  secondary={`${dateFormat(m.createdAt)}`}
                ></ListItemText>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText></ListItemText>
            </ListItem>
          )}
        </List>
      ) : (
        <List dense disablePadding component={Paper}>
          {data.length ? (
            data.map((m) => (
              <ListItem key={m.id}>
                <ListItemText
                  primaryTypographyProps={{
                    textTransform: "capitalize",
                  }}
                  primary={`${m.user.firstName} ${m.user.lastName}`}
                  secondary={`${m.status}`}
                ></ListItemText>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText></ListItemText>
            </ListItem>
          )}
        </List>
      )}
    </>
  );
}

export default ListData;
