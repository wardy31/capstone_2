import {
  Box,
  Button,
  Divider,
  IconButton,
  Pagination,
  Paper,
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
import store from "../../../store/store";
import {
  getDepartment,
  searchDepartment,
} from "../../../store/actions/departmentAction";
import { useSelector, useDispatch } from "react-redux";
import { setDialog } from "../../../store/reducers/departmentReducer";

import AddModal from "./modal/AddModal";
import DeleteModal from "./modal/DeleteModal";
import UpdateModal from "./modal/UpdateModal";

import NoRecord from "../../../layouts/no_records/Index";
import Skeletonloading from "../../../layouts/skeletons/Table";

import Search from "../../search/Index";

function DepartmentTable() {
  const { data, loading } = useSelector((state) => state.department.get);
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const [form, setForm] = useState({ name: "", collegeId: "" });

  useEffect(() => {
    store.dispatch(getDepartment());
  }, []);

  if (loading && !data.length) {
    return <Skeletonloading />;
  }
  return (
    <>
      <DeleteModal id={id} />
      <UpdateModal id={id} param={form} />
      <Box
        sx={{
          overflow: "auto",
          mt: 1,
          bgcolor: "white",
          boxShadow: 1,
          borderRadius: 1,
        }}
      >
        <Divider></Divider>
        {data.length ? (
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
                  <TableCell>
                    <Typography
                      fontSize={13}
                      sx={{ fontWeight: "bold" }}
                      color="text.secondary"
                    >
                      College Assign
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
                    <TableRow key={m.id}>
                      <TableCell>
                        <Typography fontSize={13} color="text.primary">
                          {m.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontSize={13} color="text.primary">
                          {m.college.name}
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
                              setForm({
                                ...form,
                                name: m.name,
                                collegeId: m.college.id,
                              });
                            }}
                          >
                            <EditTwoToneIcon fontSize={"small"} />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="delete">
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
                            <DeleteTwoToneIcon fontSize={"small"} />
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
        ) : (
          <NoRecord />
        )}
      </Box>
    </>
  );
}

export default DepartmentTable;
