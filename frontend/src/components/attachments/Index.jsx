import {
  Avatar,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PDFViewer from "./PDFViewer";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FileOpenIcon from "@mui/icons-material/FileOpen";

function Index({ form }) {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    setData(form);
  }, [form]);

  const openModal = (status) => {
    setModal(status);
    if (!status) {
      setData(null);
    } else {
      setData(form);
    }
  };

  const checkOffline = () => {
    if (navigator.onLine) {
      return form;
    } else {
      if (typeof form?.research == "string") {
        console.log(JSON.parse(form?.research));
        return JSON.parse(form?.research);
      }

      return form?.research;
    }
  };

  return (
    <>
      {data && <PDFViewer modal={modal} handleModal={openModal} form={data} />}
      <List
        sx={{
          width: {
            xs: "auto",
            lg: "35%",
          },
        }}
      >
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => openModal(true)}
            sx={{
              bgcolor: "primary.light",
              borderRadius: 1,
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "primary.main" }} variant="rounded">
                <FileOpenIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  textTransform={"uppercase"}
                  fontWeight={"bold"}
                  fontSize={13}
                  letterSpacing={1.5}
                  whiteSpace={"nowrap"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                >
                  {checkOffline()?.title}
                </Typography>
              }
              secondary={
                <Typography fontSize={12} sx={{ color: "text.secondary" }}>
                  PDF File
                </Typography>
              }
            ></ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      {/* <Card
        sx={{ maxWidth: 380, borderRadius: 2, height: "auto" }}
        elevation={4}
      >
        <CardActionArea
          sx={{ display: "flex", height: 110 }}
          onClick={() => openModal(true)}
        >
          <CardMedia
            sx={{ width: 152, height: 152 }}
            draggable={false}
            component={"img"}
            src={
              navigator.onLine
                ? `${import.meta.env.VITE_BE_COVER_HOST}cover/${
                    form?.id
                  }/cover.png`
                : form.image
            }
            alt="Cover"
          ></CardMedia>
          <CardHeader
            sx={{ width: "100%" }}
            title={navigator.onLine ? form?.title : form?.research?.title}
            subheader="PDF"
            subheaderTypographyProps={{
              mt: 0.5,
              fontSize: 14,
              fontWeight: "light",
            }}
            titleTypographyProps={{ fontSize: 14, fontWeight: "bold" }}
          ></CardHeader>
        </CardActionArea>
      </Card> */}
    </>
  );
}

export default Index;
