import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import { useSelector } from "react-redux";
import store from "../../store/store";
import { getResearchById } from "../../store/actions/researchAction";
import moment from "../../utils/moment";
import FeedbackCard from "../feedback/FeedbackCard";
import LogsCard from "../research_logs/LogsCard";
import Attachment from "../attachments/Index";

function ResearchFacultyInChargeView() {
  const { data, loading, error } = useSelector((state) => state.research.view);
  const { id } = useParams();

  const offlineText = () => {
    if (navigator.onLine) {
      const users = data;
      return users;
    } else {
      if (typeof data?.research == "string") {
        const users = JSON.parse(data?.research);
        return users;
      }

      return data?.research;
    }
  };

  useEffect(() => {
    store.dispatch(getResearchById(id));
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={9}>
        <Card sx={{ borderRadius: 1 }} elevation={4}>
          <CardHeader
            title={offlineText()?.title}
            titleTypographyProps={{
              fontWeight: "bold",
              fontSize: 20,
              textTransform: "capitalize",
              color: "primary.main",
            }}
            subheader={
              <>
                <Typography display="inline" fontSize={13}>
                  {offlineText()?.keyIdentifier}
                </Typography>
                <Typography display="inline" fontSize={13} px={0.6}>
                  •
                </Typography>
                <Typography display="inline" fontSize={13}>
                  {moment(offlineText()?.createdAt)}
                </Typography>
              </>
            }
          ></CardHeader>

          <CardContent>
            <Box>
              <Typography sx={{ wordWrap: "break-word", fontSize: 15 }}>
                {offlineText()?.abstract}
              </Typography>
            </Box>

            <Box sx={{ my: 5 }}>
              <Typography sx={{ fontSize: 14, wordWrap: "break-word" }}>
                Uploaded By :
              </Typography>
              {typeof offlineText() == "object" &&
                offlineText()?.researchAuthors?.map((m, i) => (
                  <Typography
                    fontSize={14}
                    key={i}
                    letterSpacing={1.1}
                    sx={{ color: "text.secondary" }}
                  >
                    {`${m.user.firstName} ${m.user.lastName}`}
                  </Typography>
                ))}

              <Typography sx={{ fontSize: 14, wordWrap: "break-word", mt: 2 }}>
                Paper Type :
              </Typography>
              <Typography
                fontSize={14}
                letterSpacing={1.1}
                sx={{ color: "text.secondary" }}
              >
                {offlineText()?.paperType}
              </Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: 14 }}>Attachment :</Typography>
              <Attachment form={data} />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} lg={3}>
        <Grid container rowSpacing={1}>
          <Grid item xs={12}>
            <FeedbackCard id={id} />
          </Grid>
          <Grid item xs={12}>
            {/* <LogsCard data={} /> */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ResearchFacultyInChargeView;
