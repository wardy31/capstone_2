import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function ResearchCard() {
  const [data, setData] = useState([1,2,3,4,5,6,8,9,10]);
  return (
    <Grid container spacing={4}>
      {data.map((m) => (
        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ boxShadow: 8 }}>
            <Skeleton variant="rectangular" height={160}></Skeleton>
            <CardContent>
              <Skeleton variant="text"></Skeleton>
              <Skeleton variant="text"></Skeleton>
              <Skeleton
                variant="text"
                width={120}
                sx={{ mt: 1.2, fontSize: "0.8rem" }}
              ></Skeleton>
              <Skeleton variant="text" sx={{ mt: 1.2 }}></Skeleton>
              <Skeleton variant="text" width={180}></Skeleton>
            </CardContent>

            <CardActions sx={{ mx: 1 }}>
              <Skeleton variant="rounded" width={75} height={25}></Skeleton>
              <Box sx={{ flexGrow: 1 }}></Box>
              <Skeleton variant="rounded" width={40} height={25}></Skeleton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ResearchCard;
