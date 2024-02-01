import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

function CountCard({ title, count, loading }) {
  return (
    <Card sx={{height:"100%"}}>
      <CardHeader
        titleTypographyProps={{
          textOverflow: "ellipsis",
          fontSize: 15,
          color: "text.main",
        }}
        title={title}
      ></CardHeader>
      <CardContent>
        <Typography
          variant={"h4"}
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          {count ?? 0}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CountCard;
