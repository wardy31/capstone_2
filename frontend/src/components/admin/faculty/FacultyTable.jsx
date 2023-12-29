import {
  Box,
  Chip,
  FormControl,
  IconButton,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import PersonOffTwoToneIcon from "@mui/icons-material/PersonOffTwoTone";
import store from "../../../store/store";
import {
  changeRole,
  getFaculty,
  validateFaculty,
  searchFaculty,
} from "../../../store/actions/facultyAction";
import { useSelector, useDispatch } from "react-redux";
import { setDialog } from "../../../store/reducers/facultyReducer";
import Diversity3TwoToneIcon from "@mui/icons-material/Diversity3TwoTone";
import DeleteModal from "./modal/DeleteModal";

import NoRecord from "../../../layouts/no_records/Index";
import Skeletonloading from "../../../layouts/skeletons/Table";

import Search from "../../search/Index";

import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ConfirmationModal from "../../Modal/ConfirmationModal";

function FacultyTable({ query }) {
  const { data, loading } = useSelector((state) => state.faculty.get);
  const { loading: validateLoading } = useSelector(
    (state) => state.faculty.validate
  );

  const [id, setId] = useState();
  const [form, setForm] = useState({
    id: "",
    status: "",
  });

  // Confirmation
  const [open, setOpen] = useState(false);
  const handleClick = async () => {
    // store.dispatch(validateFaculty(form.id, form.status, query));
    const res = await store.dispatch(changeRole(form.id, query));
    if (res) setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleModal = (id, status) => {
    setOpen(true);
    setForm({ ...form, id: id, status: status });
  };

  const handleUpdate = async (id, status) => {
    store.dispatch(validateFaculty(id, status, query));
  };

  useEffect(() => {
    store.dispatch(getFaculty({ isValidate: "all", search: "" }));
  }, []);

  if (loading && !data.length) {
    return <Skeletonloading />;
  }

  return (
    <>
      <ConfirmationModal
        open={open}
        handleClick={handleClick}
        handleClose={handleClose}
        title="Confirmation"
        loading={validateLoading}
        content={"Assign as faculty in charge ?"}
      ></ConfirmationModal>
      <DeleteModal id={id} />
      {data.length ? (
        <Box sx={{ overflow: "auto", mt: 1, boxShadow: 2 }}>
          <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
            <Table component={Paper}>
              <TableHead sx={{ bgcolor: "primary.light" }}>
                <TableRow>
                  <TableCell>
                    <Typography
                      fontSize={13}
                      sx={{ fontWeight: "bold" }}
                      color="text.secondary"
                    >
                      Faculty ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      fontSize={13}
                      sx={{ fontWeight: "bold" }}
                      color="text.secondary"
                    >
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      fontSize={13}
                      sx={{ fontWeight: "bold" }}
                      color="text.secondary"
                    >
                      College
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      fontSize={13}
                      sx={{ fontWeight: "bold" }}
                      color="text.secondary"
                    >
                      Course
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      fontSize={13}
                      sx={{ fontWeight: "bold" }}
                      color="text.secondary"
                    >
                      Status
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      fontSize={13}
                      sx={{ fontWeight: "bold" }}
                      color="text.secondary"
                    >
                      Assign Status
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      fontSize={13}
                      sx={{ fontWeight: "bold" }}
                      color="text.secondary"
                    >
                      Action
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((m) => {
                  return (
                    <TableRow key={m.id}>
                      <TableCell>
                        <Typography fontSize={13} color="text.primary">
                          {m.roleID}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontSize={13} color="text.primary">
                          {m.firstName + " " + m.lastName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontSize={13} color="text.primary">
                          {m?.college?.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontSize={13} color="text.primary">
                          {m?.course?.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {m.isValidate == "approve" && (
                          <Chip
                            label={"Approve"}
                            color={"success"}
                            size="small"
                            sx={{
                              color: "white",
                              letterSpacing: 1.5,
                              textTransform: "capitalize",
                            }}
                          ></Chip>
                        )}
                        {m.isValidate == "declined" && (
                          <Chip
                            label={"Declined"}
                            color={"error"}
                            size="small"
                            sx={{
                              letterSpacing: 1.5,
                              textTransform: "capitalize",
                            }}
                          ></Chip>
                        )}

                        {m.isValidate == "disabled" && (
                          <Chip
                            label={"Disabled"}
                            color={"error"}
                            size="small"
                            sx={{
                              color: "white",
                              letterSpacing: 1.5,
                              textTransform: "capitalize",
                            }}
                          ></Chip>
                        )}
                        {m.isValidate == "pending_approval" && (
                          <Chip
                            label={"Pending"}
                            color={"error"}
                            size="small"
                            sx={{
                              color: "white",
                              letterSpacing: 1.5,
                              textTransform: "capitalize",
                            }}
                          ></Chip>
                        )}
                      </TableCell>
                      <TableCell>
                        <FormControl fullWidth>
                          {/* <InputLabel id="demo-simple-select-label">
                            Status
                          </InputLabel> */}
                          <Select
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={m.isValidate}
                            // label="Status"
                            fullWidth
                            sx={{ bgcolor: "primary.light" }}
                            onChange={(e) => {
                              handleUpdate(m.id, e.target.value);
                            }}
                          >
                            <MenuItem value={"approve"}>Approve</MenuItem>
                            <MenuItem value={"pending_approval"}>
                              Pending Approval
                            </MenuItem>
                            <MenuItem value={"decline"}>Decline</MenuItem>
                            <MenuItem value={"disabled"}>Disable</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Assign as Faculty In Charge">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => {
                              handleModal(m.id, "approve");
                            }}
                          >
                            <Diversity3TwoToneIcon fontSize={"small"} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
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
        <NoRecord />
      )}
    </>
  );
}

export default FacultyTable;
