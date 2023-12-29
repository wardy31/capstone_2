import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { year, month } from "../../utils/moment";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { Link, useNavigate } from "react-router-dom";
import { addFavorite } from "../../store/actions/favoriteAction";
import store from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import SearchResearch from "./SearchResearch";
import Header from "../Header/Header";
import ConfirmationModal from "../Modal/ConfirmationModal";

function ResearchCard({ loading, error, data = [], page }) {
  const { grid } = useSelector((state) => state.theme);
  const [query, setQuery] = useState();
  const handleQuery = (e) => {};

  // if (loading && !data?.length) {
  //   return <SkeletonCard />;
  // }
  // Confirmation
  const [form, setForm] = useState({
    id: "",
    status: "",
  });
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    const res = await store.dispatch(addFavorite(form.id));
    if (res) setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleModal = (id) => {
    setOpen(true);
    setForm({ ...form, id: id });
  };

  return (
    <>
      <ConfirmationModal
        open={open}
        handleClick={handleClick}
        handleClose={handleClose}
        title="Confirmation"
        content={"Add to Saved Research ?"}
      ></ConfirmationModal>

      <Header
        primary={"Home Page"}
        secondary={" contains all published research on your course"}
      ></Header>

      <Box mb={4}></Box>
      <SearchResearch handleQuery={handleQuery} query={query} page={"home"} />
      <List
        dense
        sx={{
          // display: {
          //   xs: "block",
          //   lg: "none",
          // },
          mt: 2,
        }}
      >
        <Grid container columnSpacing={1} rowSpacing={{ xs: 0.6, md: 1 }}>
          {data.map((m, i) => (
            <>
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <ListItem
                  sx={{
                    boxShadow: {
                      xs: 1,
                      md: 1,
                    },
                    borderRadius: 1,
                    bgcolor: "white",
                    ":hover": {
                      bgcolor: "primary.light",
                    },
                  }}
                  key={i}
                  disablePadding
                  secondaryAction={
                    m.SavedResearch.length == 0 && (
                      <IconButton
                        size="large"
                        color="primary"
                        variant="contained"
                        onClick={() => handleModal(m.id)}
                        sx={{ borderRadius: 10 }}
                      >
                        <FavoriteTwoToneIcon sx={{ color: "primary.main" }} />
                      </IconButton>
                    )
                  }
                >
                  <ListItemButton
                    LinkComponent={Link}
                    to={`view/${m.id}`}
                    sx={{ py: 1 }}
                  >
                    <ListItemText
                      primary={
                        <Box display={"flex"}>
                          <Typography
                            sx={{
                              color: "primary.main",
                              fontSize: 13,
                              letterSpacing: 1.5,
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: { xs: "normal", md: "nowrap" },
                              mr: 3,
                            }}
                          >
                            {m.title}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography
                            display="inline"
                            sx={{
                              fontSize: 11,
                              letterSpacing: 1.5,
                              pr: 0.5,
                              color: "text.secondary",
                            }}
                          >
                            {m.keyIdentifier}
                          </Typography>
                          <Typography
                            display="inline"
                            sx={{
                              fontSize: 12,
                              letterSpacing: 1.5,
                              pr: 0.5,
                              color: "text.secondary",
                            }}
                          >
                            •
                          </Typography>
                          <Typography
                            display="inline"
                            sx={{
                              fontSize: 11,
                              letterSpacing: 1.5,
                              pr: 1,
                              color: "text.secondary",
                            }}
                          >
                            {month(`${m.month}-15-2023`) +
                              " " +
                              year(`${m.month}-15-${m.year}`)}
                          </Typography>{" "}
                        </>
                      }
                    ></ListItemText>
                    {/* <ListItemIcon>
              <StarIcon />
            </ListItemIcon> */}
                  </ListItemButton>
                </ListItem>
                {/* <Divider component="li" /> */}
              </Grid>
            </>
          ))}
        </Grid>
      </List>
    </>
    // <>
    //   <Header
    //     primary={"Home Page"}
    //     secondary={" contains all published research on your course"}
    //   ></Header>

    //   <SearchResearch handleQuery={handleQuery} query={query} page={"home"} />
    //   {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
    //     <ToggleButtonGroup
    //       value={grid}
    //       exclusive
    //       onChange={handleChangeTab}
    //       sx={{ mb: 3 }}
    //       size="small"
    //       color="primary"
    //     >
    //       <ToggleButton value="left" aria-label="left aligned">
    //         <TableRowsIcon />
    //       </ToggleButton>
    //       <ToggleButton value="right" aria-label="right aligned">
    //         <WindowIcon />
    //       </ToggleButton>
    //     </ToggleButtonGroup>
    //   </Box> */}

    //   {data?.length ? (
    //     <Box
    //       sx={{
    //         overflow: "auto",
    //         mt: 2,
    //         boxShadow: 1,
    //         borderRadius: 2,
    //         display: {
    //           xs: "none",
    //           // lg: "block",
    //         },
    //       }}
    //     >
    //       <Paper sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
    //         <TableContainer>
    //           {/* <Table sx={{ minWidth: 650 }} size="small"> */}
    //           <Table>
    //             <TableHead sx={{ bgcolor: "primary.light" }}>
    //               <TableRow>
    //                 <TableCell
    //                   sx={{
    //                     color: "text.secondary",
    //                     fontWeight: "bold",
    //                     fontSize: 13,
    //                   }}
    //                 >
    //                   ID
    //                 </TableCell>
    //                 <TableCell
    //                   sx={{
    //                     color: "text.secondary",
    //                     fontWeight: "bold",
    //                     fontSize: 13,
    //                   }}
    //                 >
    //                   Title
    //                 </TableCell>
    //                 {/* <TableCell sx={{ color: "text.secondary" }}>Paper Type</TableCell> */}
    //                 <TableCell
    //                   sx={{
    //                     color: "text.secondary",
    //                     fontWeight: "bold",
    //                     fontSize: 13,
    //                   }}
    //                 >
    //                   Term Period
    //                 </TableCell>
    //                 <TableCell
    //                   sx={{
    //                     color: "text.secondary",
    //                     fontWeight: "bold",
    //                     fontSize: 13,
    //                   }}
    //                 >
    //                   Date Published
    //                 </TableCell>
    //                 <TableCell
    //                   sx={{
    //                     color: "text.secondary",
    //                     textAlign: "center",
    //                     fontWeight: "bold",
    //                     fontSize: 13,
    //                   }}
    //                 >
    //                   Action
    //                 </TableCell>
    //               </TableRow>
    //             </TableHead>
    //             <TableBody>
    //               {data.map((m, i) => (
    //                 <>
    //                   <TableRow
    //                     key={i}
    //                     // onClick={() => navigate(`view/${m.id}`)}
    //                     sx={{
    //                       userSelect: "none",
    //                       position: "relative",
    //                       borderRadius: 13,
    //                     }}
    //                   >
    //                     <TableCell
    //                       sx={{ fontSize: 13, color: "text.secondary" }}
    //                     >
    //                       {m.keyIdentifier}
    //                     </TableCell>
    //                     <TableCell
    //                       sx={{
    //                         fontSize: 13,
    //                         fontWeight: "bold",
    //                         letterSpacing: 1.5,
    //                       }}
    //                     >
    //                       {m.title}
    //                     </TableCell>
    //                     <TableCell
    //                       sx={{ fontSize: 13, color: "text.secondary" }}
    //                     >
    //                       {month(`${m.month}-15-2023`) +
    //                         " " +
    //                         year(`${m.month}-15-${m.year}`)}
    //                     </TableCell>
    //                     <TableCell
    //                       sx={{ fontSize: 13, color: "text.secondary" }}
    //                     >
    //                       {moment(m.updatedAt)}
    //                     </TableCell>
    //                     <TableCell
    //                       sx={{
    //                         textAlign: "center",
    //                         fontSize: 13,
    //                         color: "text.secondary",
    //                       }}
    //                     >
    //                       {m.SavedResearch.length ? (
    //                         <IconButton
    //                           variant="contained"
    //                           // onClick={() => store.dispatch(addFavorite(m.id))}
    //                           sx={{ borderRadius: 10 }}
    //                         >
    //                           <FavoriteIcon sx={{ color: "primary.main" }} />
    //                         </IconButton>
    //                       ) : (
    //                         <IconButton
    //                           color="primary"
    //                           variant="contained"
    //                           onClick={() => store.dispatch(addFavorite(m.id))}
    //                           sx={{ borderRadius: 10 }}
    //                         >
    //                           <FavoriteBorderTwoToneIcon
    //                             sx={{ color: "text.disabled" }}
    //                           />
    //                         </IconButton>
    //                       )}

    //                       <IconButton
    //                         variant="contained"
    //                         onClick={() => navigate(`view/${m.id}`)}
    //                         sx={{ borderRadius: 10 }}
    //                       >
    //                         <VisibilityIcon sx={{ color: "primary.main" }} />
    //                       </IconButton>
    //                     </TableCell>
    //                   </TableRow>
    //                 </>
    //               ))}
    //             </TableBody>
    //           </Table>
    //         </TableContainer>
    //       </Paper>
    //     </Box>
    //   ) : (
    //     <NoRecord></NoRecord>
    //   )}

    //   {/* {data?.length ? (
    //     <List>
    //       {data.map((m, i) => (
    //         <ListItem
    //           sx={{ bgcolor: "white", mb: 0.8, boxShadow: 2 }}
    //           key={i}
    //           secondaryAction={
    //             m.SavedResearch.length ? (
    //               <IconButton>
    //                 <FavoriteIcon />
    //               </IconButton>
    //             ) : (
    //               <IconButton
    //                 color="success"
    //                 onClick={() => store.dispatch(addFavorite(m.id))}
    //               >
    //                 <FavoriteBorderTwoToneIcon />
    //               </IconButton>
    //             )
    //           }
    //           disablePadding
    //         >
    //           <ListItemButton LinkComponent={Link} to={`view/${m.id}`}>
    //             <ListItemText
    //               primary={m.title}
    //               // secondary={moment(m.createdAt)}
    //             ></ListItemText>
    //             <ListItemText
    //               primary={m.title}
    //               // secondary={moment(m.createdAt)}
    //             ></ListItemText>
    //             <ListItemText
    //               primary={m.title}
    //               // secondary={moment(m.createdAt)}
    //             ></ListItemText>
    //           </ListItemButton>
    //         </ListItem>
    //       ))}
    //     </List>
    //   ) : (
    //     <NoRecord></NoRecord>
    //   )} */}

    //   {/* {data.length ? (
    //     <Grid container spacing={4}>
    //       {data.map((m, i) => (
    //         <Grid
    //           key={i}
    //           item
    //           xs={13}
    //           md={6}
    //           lg={3}
    //           sx={{
    //             transition: theme.transitions.create(),
    //             ":hover": {
    //               transform: "scale(1.1)",
    //             },
    //           }}
    //         >
    //           <Box sx={{ position: "relative" }}>
    //             <Box
    //               sx={{
    //                 position: "absolute",
    //                 zIndex: "modal",
    //                 right: 6,
    //                 top: 6,
    //               }}
    //             >
    //               <Box sx={{ flexGrow: 8 }}></Box>
    //               {m.SavedResearch.length ? (
    //                 <Button
    //                   variant="contained"
    //                   startIcon={<FavoriteIcon sx={{ color: "white" }} />}
    //                   // onClick={() => store.dispatch(addFavorite(m.id))}
    //                   sx={{ borderRadius: 10 }}
    //                 >
    //                   <Typography textTransform={"capitalize"} fontSize={13}>
    //                     Added
    //                   </Typography>
    //                 </Button>
    //               ) : (
    //                 <Button
    //                   color="success"
    //                   variant="contained"
    //                   startIcon={
    //                     <FavoriteBorderTwoToneIcon sx={{ color: "white" }} />
    //                   }
    //                   onClick={() => store.dispatch(addFavorite(m.id))}
    //                   sx={{ borderRadius: 10 }}
    //                 >
    //                   <Typography textTransform={"capitalize"} fontSize={13}>
    //                     Add to Favorite
    //                   </Typography>
    //                 </Button>
    //               )}
    //             </Box>
    //             <CardActionArea LinkComponent={Link} to={`view/${m.id}`}>
    //               <Card
    //                 sx={{
    //                   boxShadow: 8,
    //                   height: "100%",
    //                   display: "flex",
    //                   flexDirection: "column",
    //                   justifyContent: "space-between",
    //                   userSelect: "none",
    //                   position: "relative",
    //                 }}
    //               >
    //                 <CardMedia
    //                   component={"img"}
    //                   height={160}
    //                   src={`${import.meta.env.VITE_BE_COVER_HOST}cover/${
    //                     m.id
    //                   }/cover.png`}
    //                   alt="research_cover_image"
    //                   draggable="false"
    //                 ></CardMedia>

    //                 <CardContent>
    //                   <Typography
    //                     sx={{
    //                       fontSize: 13,
    //                       fontWeight: "bold",
    //                       letterSpacing: 1.5,
    //                       textAlign: "start",
    //                       mb: 1.2,
    //                     }}
    //                   >
    //                     {m.title}
    //                   </Typography>
    //                   <Typography
    //                     sx={{
    //                       fontSize: 10,
    //                       fontWeight: "light",
    //                       letterSpacing: 1.5,
    //                       mb: 1.2,
    //                     }}
    //                   >
    //                     {moment(m.createdAt)}
    //                   </Typography>
    //                   <Typography
    //                     sx={{
    //                       fontSize: 13,
    //                       letterSpacing: 1.5,
    //                       color: "secondary.main",
    //                       wordWrap: "break-word",
    //                     }}
    //                   >
    //                     {padd(m.abstract)}
    //                   </Typography>
    //                 </CardContent>
    //                 <CardActions>
    //                   <Box sx={{ flexGrow: 1 }}></Box>
    //                   {m.SavedResearch.length ? (
    //                     <Typography textTransform={"capitalize"} fontSize={13}>
    //                       Added to favorites
    //                     </Typography>
    //                   ) : (
    //                     <IconButton
    //                       onClick={() => store.dispatch(addFavorite(m.id))}
    //                     >
    //                       <FavoriteBorderTwoToneIcon
    //                         sx={{ color: "primary.main" }}
    //                       />
    //                     </IconButton>
    //                   )}
    //                 </CardActions>
    //               </Card>
    //             </CardActionArea>
    //           </Box>
    //         </Grid>
    //       ))}
    //     </Grid>
    //   ) : (
    //     <NoRecord></NoRecord>
    //   )} */}
    // </>
  );
}

export default ResearchCard;
