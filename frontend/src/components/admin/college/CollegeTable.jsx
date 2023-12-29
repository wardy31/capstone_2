import {
  Box,
  Button,
  Collapse,
  Container,
  IconButton,
  List,
  ListItem,
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
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import store from "../../../store/store";
import {
  getCollege,
  getDepartmentOfCollege,
  searchCollege,
} from "../../../store/actions/collegeAction";
import { useSelector, useDispatch } from "react-redux";
import AddModal from "./modal/AddModal";
import DeleteModal from "./modal/DeleteModal";
import UpdateModal from "./modal/UpdateModal";
import { setDialog } from "../../../store/reducers/collegeReducer";
import NoRecord from "../../../layouts/no_records/Index";
import Skeletonloading from "../../../layouts/skeletons/Table";
import Search from "../../search/Index";
import DoorFrontIcon from "@mui/icons-material/DoorFront";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import {
  getDepartment,
  searchDepartment,
} from "../../../store/actions/departmentAction";

function CollegeTable() {
  const { data, loading } = useSelector((state) => state.college.get);
  const { data: getDepartments, loading: loadingDepartment } = useSelector(
    (state) => state.college.department
  );
  const [id, setId] = useState(null);
  const [form, setForm] = useState({ name: "" });
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    store.dispatch(getCollege());
    // store.dispatch(getDepartmentOfCollege());
  }, []);

  if (loading && !data.length) {
    return (
      <>
        <Skeletonloading />
      </>
    );
  }

  return (
    <>
      <DeleteModal id={id} />
      <UpdateModal id={id} param={form} />

  
      {data.length ? (
        <Box sx={{ overflow: "auto", mt: 1 ,boxShadow:2}}>
          <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
            <Table component={Paper}>
              <TableHead sx={{bgcolor:"primary.light"}}>
                <TableRow>
                  <TableCell>
                    <Typography
                      fontSize={13}
                      sx={{ fontWeight: "bold" }}
                      color="text.secondary"
                    >
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      fontSize={13}
                      sx={{ fontWeight: "bold" }}
                      color="text.secondary"
                    >
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((m) => {
                  return (
                    <>
                      <TableRow key={m.id}>
                        {/* <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="meduim"
                          onClick={() => setOpen(!open)}
                          color="primary"
                        >
                          {open ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell> */}
                        <TableCell>
                          <Typography fontSize={13} color="text.primary">
                            {m.name}
                          </Typography>
                        </TableCell>

                        <TableCell align="right">
                          <Tooltip title="Update">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => {
                                dispatch(
                                  setDialog({ type: "put", payload: true })
                                );
                                setId(m.id);
                                setForm({ ...form, name: m.name });
                              }}
                            >
                              <EditTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => {
                                dispatch(
                                  setDialog({ type: "delete", payload: true })
                                );
                                setId(m.id);
                              }}
                            >
                              <DeleteTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                      {/* <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}
                      >
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 1 }}>
                            <Typography
                              variant="title1"
                              fontWeight={"bold"}
                              gutterBottom
                              component="div"
                            >
                              Departments
                            </Typography>
                          </Box>

                          <List>
                            {m.departments.length ? (
                              m.departments.map((m) => (
                                <ListItem>
                                  <ListItemIcon>
                                    <DoorFrontIcon></DoorFrontIcon>
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={m.name}
                                    primaryTypographyProps={{
                                      fontSize: 14,
                                    }}
                                  ></ListItemText>
                                </ListItem>
                              ))
                            ) : (
                              <ListItem>
                                <ListItemIcon>
                                  <DoorFrontIcon></DoorFrontIcon>
                                </ListItemIcon>
                                <ListItemText
                                  primary={"No departments found"}
                                  primaryTypographyProps={{
                                    fontSize: 14,
                                  }}
                                ></ListItemText>
                              </ListItem>
                            )}
                          </List>
                        </Collapse>
                      </TableCell>
                    </TableRow> */}
                    </>
                  );
                })}
              </TableBody>
            </Table>
            {/* <Pagination
            count={10}
            color="primary"
            shape="rounded"
            sx={{ mt: 3 }}
          /> */}
          </Box>
        </Box>
      ) : (
        <>
          <NoRecord />
        </>
      )}
    </>
  );
}

export default CollegeTable;
