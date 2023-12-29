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
  ListItemText,
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

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { month, year } from "../../utils/moment";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { deleteFavorite } from "../../store/actions/favoriteAction";
import store from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setGrid } from "../../store/reducers/themeReducer";
import ConfirmationModal from "../Modal/ConfirmationModal";

function ResearchSavedCard({ data, loading, error }) {
  const dispatch = useDispatch();

  // Confirmation
  const [form, setForm] = useState({
    id: "",
    status: "",
  });
  const [open, setOpen] = useState(false);
  const handleClick = async () => {
    const res = await store.dispatch(deleteFavorite(form.id));
    if (res) setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleModal = (id) => {
    setOpen(true);
    setForm({ ...form, id: id });
  };

  const checkOffline = (data) => {
    if (!navigator.onLine) {
      if (typeof data == "string") {
        return JSON.parse(data);
      }
      return data;
    }
    return data;
  };

  if (loading) {
    return <>{/* <SkeletonCard /> */}</>;
  }

  return (
    <>
      <ConfirmationModal
        open={open}
        handleClick={handleClick}
        handleClose={handleClose}
        title="Confirmation"
        content={"Remove the saved research ?"}
      ></ConfirmationModal>

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
        <>
          <Grid container columnSpacing={1} rowSpacing={{ xs: 0.6, md: 1 }}>
            {data.map((m, i) => (
              <>
                <Grid item xs={12} sm={6} md={3} lg={4}>
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
                      <IconButton
                        variant="contained"
                        onClick={() => handleModal(m.id)}
                        sx={{ borderRadius: 10 }}
                        size="large"
                      >
                        <DeleteTwoToneIcon sx={{ color: "primary.main" }} />
                      </IconButton>
                    }
                  >
                    <ListItemButton
                      LinkComponent={Link}
                      to={`view/${checkOffline(m.research).id}`}
                      sx={{ py: 1 }}
                    >
                      <ListItemText
                        primary={
                          <Box display={"flex"}>
                            <Typography
                              sx={{
                                fontSize: 13,
                                color: "primary.main",
                                letterSpacing: 1.5,
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: { xs: "normal", md: "nowrap" },
                                mr: 2,
                              }}
                            >
                              {checkOffline(m.research).title}
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
                              {checkOffline(m.research).keyIdentifier}
                            </Typography>

                            <Typography
                              display="inline"
                              sx={{
                                fontSize: 11,
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
                                fontSize: 12,
                                letterSpacing: 1.5,
                                pr: 1,
                                color: "text.secondary",
                              }}
                            >
                              {month(
                                `${checkOffline(m.research).month}-15-2023`
                              ) +
                                " " +
                                year(
                                  `${checkOffline(m.research).month}-15-${
                                    checkOffline(m.research).year
                                  }`
                                )}
                            </Typography>
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
        </>
      </List>
    </>
    // <>
    //   {data?.length ? (
    //     <Box
    //       sx={{
    //         overflow: "auto",
    //         mt: 2,
    //         boxShadow: 2,
    //         borderRadius: 2,
    //         display: {
    //           xs: "none",
    //           lg: "block",
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
    //                     fontSize: 12,
    //                   }}
    //                 >
    //                   ID
    //                 </TableCell>
    //                 <TableCell
    //                   sx={{
    //                     color: "text.secondary",
    //                     fontWeight: "bold",
    //                     fontSize: 12,
    //                   }}
    //                 >
    //                   Title
    //                 </TableCell>
    //                 {/* <TableCell sx={{ color: "text.secondary" }}>Paper Type</TableCell> */}
    //                 <TableCell
    //                   sx={{
    //                     color: "text.secondary",
    //                     fontWeight: "bold",
    //                     fontSize: 12,
    //                   }}
    //                 >
    //                   Term Period
    //                 </TableCell>
    //                 <TableCell
    //                   sx={{
    //                     color: "text.secondary",
    //                     fontWeight: "bold",
    //                     fontSize: 12,
    //                   }}
    //                 >
    //                   Date Published
    //                 </TableCell>
    //                 <TableCell
    //                   sx={{
    //                     color: "text.secondary",
    //                     textAlign: "end",
    //                     fontWeight: "bold",
    //                     fontSize: 12,
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
    //                       borderRadius: 12,
    //                     }}
    //                   >
    //                     <TableCell sx={{ fontSize: 12 }}>
    //                       {checkOffline(m.research).keyIdentifier}
    //                     </TableCell>
    //                     <TableCell sx={{ fontSize: 12, fontWeight: "bold" }}>
    //                       {checkOffline(m.research).title}
    //                     </TableCell>
    //                     <TableCell sx={{ fontSize: 12 }}>
    //                       {month(`${checkOffline(m.research).month}-15-2023`) +
    //                         " " +
    //                         year(`${checkOffline(m.research).month}-15-${checkOffline(m.research).year}`)}
    //                     </TableCell>
    //                     <TableCell sx={{ fontSize: 12 }}>
    //                       {moment(checkOffline(m.research).updatedAt)}
    //                     </TableCell>
    //                     <TableCell sx={{ textAlign: "end", fontSize: 12 }}>
    //                       {/* {checkOffline(m.research).SavedResearch.length ? (
    //                         <IconButton
    //                           variant="contained"
    //                           // onClick={() => store.dispatch(addFavorite(m.id))}
    //                           sx={{ borderRadius: 10 }}
    //                         >
    //                           <FavoriteIcon sx={{ color: "success.main" }} />
    //                         </IconButton>
    //                       ) : (
    //                         <IconButton
    //                           color="success"
    //                           variant="contained"
    //                           onClick={() => store.dispatch(addFavorite(m.id))}
    //                           sx={{ borderRadius: 10 }}
    //                         >
    //                           <FavoriteBorderTwoToneIcon
    //                             sx={{ color: "text.disabled" }}
    //                           />
    //                         </IconButton>
    //                       )} */}

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

    // </>
  );
}

export default ResearchSavedCard;
