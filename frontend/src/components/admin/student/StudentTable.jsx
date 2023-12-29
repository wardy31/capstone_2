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
import { useSelector, useDispatch } from "react-redux";
import store from "../../../store/store";
import { setDialog } from "../../../store/reducers/studentReducer";

import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

import DeleteModal from "./modal/DeleteModal";
import {
  getStudent,
  validateStudent,
  searchStudent,
  updateStudent,
} from "../../../store/actions/studentAction";

import NoRecord from "../../../layouts/no_records/Index";
import Skeletonloading from "../../../layouts/skeletons/Table";

import Search from "../../search/Index";

function StudentTable({ query }) {
  const { data, loading } = useSelector((state) => state.student.get);
  const dispatch = useDispatch();
  const { loading: validateLoading } = useSelector(
    (state) => state.student.validate
  );
  const [id, setId] = useState(null);
  const [form, setForm] = useState(null);

  const handleUpdate = async (id, status) => {
    console.log(query);
    store.dispatch(validateStudent(id, status, query));
  };

  useEffect(() => {
    store.dispatch(getStudent({ isValidate: "all", search: "" }));
  }, []);

  if (loading && !data.length) {
    return <Skeletonloading />;
  }
  return (
    <>
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
                      Student ID
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
                  <TableCell align="left">
                    <Typography
                      fontSize={13}
                      sx={{ fontWeight: "bold" }}
                      color="text.secondary"
                    >
                      Assign Status
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((m) => {
                  return (
                    <TableRow key={m.id}>
                      <TableCell>
                        <Typography
                          fontSize={13}
                          color="text.primary"
                          letterSpacing={1.2}
                        >
                          {m.roleID}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          fontSize={13}
                          color="text.primary"
                          fontWeight={"bold"}
                          letterSpacing={1.2}
                        >
                          {m.firstName + " " + m.lastName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontSize={13} color="text.primary">
                          {m?.college.name}
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
                            label={"Approved"}
                            color={"success"}
                            size="small"
                            sx={{
                              letterSpacing: 1.5,
                              textTransform: "capitalize",
                              color: "white",
                            }}
                          ></Chip>
                        )}

                        {m.isValidate == "decline" && (
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
                            size="small"
                            sx={{
                              bgcolor: "text.disabled",
                              color: "white",
                              letterSpacing: 1.5,
                              textTransform: "capitalize",
                            }}
                          ></Chip>
                        )}
                        {m.isValidate == "pending_approval" && (
                          <Chip
                            label={"Pending"}
                            color={"info"}
                            size="small"
                            sx={{
                              color: "white",
                              letterSpacing: 1.5,
                              textTransform: "capitalize",
                            }}
                          ></Chip>
                        )}
                      </TableCell>
                      <TableCell align="left">
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
                        {/* {m.isValidate == "disabled" && (
                          <Tooltip title="Disabled">
                            <IconButton
                              disabled={validateLoading}
                              size="small"
                              color="disabled"
                              onClick={() => handleUpdate(m.id, "approve")}
                            >
                              <ToggleOffIcon fontSize="medium" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {m.isValidate == "approve" && (
                          <Tooltip title="Active">
                            <IconButton
                              disabled={validateLoading}
                              size="small"
                              color="success"
                              onClick={() => handleUpdate(m.id, "disabled")}
                            >
                              <ToggleOnIcon fontSize="medium" />
                            </IconButton>
                          </Tooltip>
                        )} */}
                        {/* <Tooltip title="Delete">
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
                      </Tooltip> */}
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

export default StudentTable;
