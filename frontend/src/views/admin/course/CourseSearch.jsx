import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Select,
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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import store from "../../../store/store";

import {
  getCollege,
  getDepartmentOfCollege,
} from "../../../store/actions/collegeAction";
import { useSelector } from "react-redux";
import {
  getCoursesByDepartmentId,
  addCourse,
  deleteCourseById,
  updateCourseById,
} from "../../../store/actions/courseAction";
import Modal from "./modal/Modal";

function CourseSearch({ handleQuery }) {
  const { data, loading } = useSelector((state) => state.college.get);
  const { data: departmentData, loading: departmentLoading } = useSelector(
    (state) => state.college.department
  );
  const { data: courseData, loading: courseLoading } = useSelector(
    (state) => state.course.department
  );

  const {
    post: { loading: postLoading, postError },
    update: { loading: updateLoading, updateError },
    delete: { loading: deleteLoading, deleteError },
  } = useSelector((state) => state.course);

  const [query, setQuery] = useState({
    id: "",
    departmentId: "",
    courseId: "",
  });

  const handleCollege = (id) => {
    setQuery({ ...query, id: id, departmentId: "" });
    store.dispatch(getDepartmentOfCollege(id));
  };

  const handleDepartment = (id) => {
    setQuery({ ...query, departmentId: id });
    store.dispatch(getCoursesByDepartmentId(id));
  };

  // Modal
  const [open, setOpen] = useState({
    update: false,
    delete: false,
    add: false,
  });
  const [form, setForm] = useState({ name: "", departmentId: "" });
  const [id, setId] = useState("");
  const [type, setType] = useState("");

  const handleModal = (typeParam, val = "") => {
    setOpen({ ...form, [typeParam]: true });
    setType(typeParam);
    setForm({ ...form, departmentId: query.departmentId.toString() });
    console.log(query.departmentId);

    if (val) {
      setId(val.id);
      setForm({ ...form, departmentId: val.departmentId, name: val.name });
    }
  };

  const handleSubmit = async () => {
    let res;
    switch (type) {
      case "add":
        console.log(form);
        res = await store.dispatch(addCourse(form, query.departmentId));
        if (res) setOpen({ ...open, add: false });
        break;
      case "update":
        res = await store.dispatch(updateCourseById(id, form));
        if (res) setOpen({ ...open, update: false });
        break;
      case "delete":
        res = await store.dispatch(deleteCourseById(id, query.departmentId));
        if (res) setOpen({ ...open, delete: false });
        break;
      default:
        break;
    }
  };
  const handleChange = (value, form_property) => {
    setForm({ ...form, [form_property]: value });
  };
  const handleClose = () => {
    setForm({ name: "", departmentId: "" });
    setOpen({ ...form, [type]: false });
  };

  useEffect(() => {
    store.dispatch(getCollege());
  }, []);

  if (!data.length) {
    return <></>;
  }

  return (
    <>
      <Paper sx={{ px: 2, py: 2, width: "auto" }}>
        {open.add && (
          <Modal
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleClose={handleClose}
            open={open.add}
            forms={form}
            title="Add"
            loading={postLoading}
            error={postError}
          />
        )}
        {open.update && (
          <Modal
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleClose={handleClose}
            open={open.update}
            forms={form}
            title="Update"
            loading={updateLoading}
            error={updateError}
          />
        )}
        {open.delete && (
          <Modal
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleClose={handleClose}
            open={open.delete}
            forms={form}
            title="Delete"
            loading={deleteLoading}
            error={deleteError}
            subtitle="Are you sure to delete?"
          />
        )}

        <Grid container spacing={2}>
          <Grid
            item
            xs={6}
            sx={{
              display: {
                xs: "block",
                lg: "none",
              },
            }}
          >
            {" "}
            <FormControl fullWidth>
              <InputLabel>Select College</InputLabel>
              <Select
                label="Select College"
                onChange={(e) => handleCollege(e.target?.value)}
              >
                {data.length &&
                  data.map((m) => <MenuItem value={m.id}>{m.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            xs={6}
            item
            sx={{
              display: {
                xs: "block",
                lg: "none",
              },
            }}
          >
            <FormControl fullWidth>
              <InputLabel>Select Department</InputLabel>
              <Select
                label="Select Department"
                onChange={(e) => handleDepartment(e.target?.value)}
              >
                {departmentData.length != 0 &&
                  departmentData.map((m) => (
                    <MenuItem value={m.id}>{m.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={6}
            lg={4}
            sx={{
              display: {
                xs: "none",
                lg: "block",
              },
            }}
          >
            <Paper sx={{ px: 2, py: 2 }} elevation={4}>
              <Typography variant="subtitle2" mb={1}>
                Select College :
              </Typography>

              <List>
                {data.length &&
                  data.map((m) => (
                    <ListItem
                      disablePadding
                      sx={{
                        bgcolor:
                          query.id == m.id ? "primary.main" : "whitesmoke",
                        color: query.id == m.id ? "white" : null,
                      }}
                    >
                      <ListItemButton
                        selected={query.id == m.id}
                        onClick={() => handleCollege(m.id)}
                      >
                        <ListItemText
                          primary={m.name}
                          primaryTypographyProps={{ typography: "subtitle2" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </Grid>
          <Grid
            item
            xs={6}
            lg={4}
            sx={{
              display: {
                xs: "none",
                lg: "block",
              },
            }}
          >
            <Paper sx={{ px: 2, py: 2 }} elevation={4}>
              <Typography variant="subtitle2" mb={1}>
                Select Department :
              </Typography>
              <List>
                {departmentData.length != 0 &&
                  departmentData.map((m) => (
                    <ListItem
                      disablePadding
                      sx={{
                        bgcolor:
                          query.departmentId == m.id
                            ? "primary.main"
                            : "whitesmoke",
                        color: query.departmentId == m.id ? "white" : null,
                      }}
                    >
                      <ListItemButton
                        selected={query.departmentId == m.id}
                        onClick={() => handleDepartment(m.id)}
                      >
                        <ListItemText
                          primary={m.name}
                          primaryTypographyProps={{ typography: "subtitle2" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Paper sx={{ px: 2, py: 2 }} elevation={4}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                mb={1}
              >
                <Typography variant="subtitle2">Course Table</Typography>

                {query.departmentId != "" && (
                  <Button
                    variant="contained"
                    startIcon={<AddTwoToneIcon />}
                    size="small"
                    onClick={() => handleModal("add")}
                  >
                    Add
                  </Button>
                )}
              </Box>

              {courseData.length != 0 && query.departmentId != "" && (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{ fontSize: 12, color: "text.secondary" }}
                        >
                          Name
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: 12,
                            color: "text.secondary",
                            textAlign: "end",
                          }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {courseData.length != 0 &&
                        query.departmentId != "" &&
                        courseData.map((m) => (
                          <TableRow key={m.id}>
                            <TableCell>{m.name}</TableCell>
                            <TableCell sx={{ textAlign: "end" }}>
                              <IconButton
                                color="primary"
                                size="small"
                                onClick={() => handleModal("update", m)}
                              >
                                <EditTwoToneIcon fontSize="small"></EditTwoToneIcon>
                              </IconButton>
                              <IconButton
                                color="primary"
                                size="small"
                                onClick={() => handleModal("delete", m)}
                              >
                                <DeleteTwoToneIcon fontSize="small"></DeleteTwoToneIcon>
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default CourseSearch;
