import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import dateFormat, { time } from "../../../utils/moment";

function DataList({ data, loading }) {
  console.log(data);
  if (loading) {
    return <></>;
  }
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        sx={{ py: 0, pt: 2, pb: 1 }}
        titleTypographyProps={{ fontSize: 15, letterSpacing: 1.2 }}
        title="Notifications"
      ></CardHeader>
      <List disablePadding>
        {data.map((m) => (
          <>
            <ListItem>
              <ListItemText
                primaryTypographyProps={{ fontSize: 14 }}
                secondaryTypographyProps={{ fontSize: 10,mt:0.4 }}
                primary={
                  m.type == "contact" ? (
                    <>
                      <Typography
                        display={"inline"}
                        pr={0.5}
                        fontSize={12}
                        sx={{ color: "error.main", fontWeight: "bold" }}
                      >{`${m.user.firstName} ${m.user.lastName}`}</Typography>
                      <Typography display={"inline"} fontSize={12} pr={0.5}>
                        entered at
                      </Typography>
                      <Typography
                        display={"inline"}
                        fontSize={12}
                        textTransform={"uppercase"}
                        fontWeight={"bold"}
                        letterSpacing={1.1}
                      >
                        {m.station.name}.
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography
                        display={"inline"}
                        pr={0.5}
                        fontSize={12}
                        sx={{ color: "error.main", fontWeight: "bold" }}
                      >{`${m.user.firstName} ${m.user.lastName}`}</Typography>
                      <Typography display={"inline"} fontSize={12} pr={0.5}>
                        submitted the form.
                      </Typography>
                    </>
                  )
                }
                secondary={`${dateFormat(m.createdAt)} - ${time(m.createdAt)}` }
              ></ListItemText>
            </ListItem>
            <Divider variant="middle" component="li" />
          </>
        ))}
      </List>
    </Card>
  );
}

export default DataList;
