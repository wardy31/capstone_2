import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogTitle,
  Drawer,
  Modal,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDialog } from "../../../store/reducers/researchReducer";
import dateFormat from "../../../utils/moment";
function FeedbackModal({ params }) {
  const [form, setForm] = useState(params);
  const { dialog } = useSelector((state) => state.research.view);
  const dispatch = useDispatch();
  useEffect(() => {
    setForm(params);
  }, [params]);

  const handleClose = () => {
    dispatch(setDialog({ payload: !dialog, type: "view" }));
  };

  if (!params) {
    return <></>;
  }
  return (
    <Dialog
      open={dialog}
      onClose={() => handleClose()}
      maxWidth="sm"
      fullWidth="auto"
    >
      <Card>
        <CardHeader
          title={form?.title}
          subheader={`Modified at ${dateFormat(form?.createdAt)}`}
          titleTypographyProps={{
            fontSize: 18,
            mb: 0.5,
          }}
          subheaderTypographyProps={{
            fontSize: 12,
          }}
        ></CardHeader>
        <CardMedia
          component={"img"}
          sx={{ height: 280 }}
          src={`${import.meta.env.VITE_BE_COVER_HOST}cover/${
            form?.id
          }/cover.png`}
          alt={"cover"}
        ></CardMedia>
        <CardContent>
          <Typography sx={{ fontSize: 14, wordWrap: "break-word" }}>
            {form?.abstract}
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  );
}

export default FeedbackModal;
