import {
  Box,
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
import PersonOffTwoToneIcon from "@mui/icons-material/PersonOffTwoTone";
import Diversity3TwoToneIcon from "@mui/icons-material/Diversity3TwoTone";
import store from "../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import {
  getFaculty,
  changeRole,
  searchFaculty,
} from "../../../store/actions/facultyInChargeAction";
import { setDialog } from "../../../store/reducers/facultyInChargeReducer";
import DeleteModal from "./modal/DeleteModal";
import BadgeTwoToneIcon from "@mui/icons-material/BadgeTwoTone";

import NoRecord from "../../../layouts/no_records/Index";
import Skeletonloading from "../../../layouts/skeletons/Table";

import Search from "../../search/Index";
import ConfirmationModal from "../../Modal/ConfirmationModal";

function FacullyInChargeTable() {
  const { data, loading } = useSelector((state) => state.facultyInCharge.get);
  const dispatch = useDispatch();
  const [id, setId] = useState();

  useEffect(() => {
    store.dispatch(getFaculty({ search: "", isValidate: "all" }));
  }, []);

  const [form, setForm] = useState({
    id: "",
    status: "",
  });

  // Confirmation
  const [open, setOpen] = useState(false);
  const handleClick = async () => {
    // store.dispatch(validateFaculty(form.id, form.status, query));
    const res = await store.dispatch(changeRole(form.id));
    if (res) setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleModal = (id, status) => {
    setOpen(true);
    setForm({ ...form, id: id, status: status });
  };

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
      <ConfirmationModal
        open={open}
        handleClick={handleClick}
        handleClose={handleClose}
        title="Confirmation"
        content={"Assign as faculty ?"}
      ></ConfirmationModal>
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
                      Department
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
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
                    <TableRow>
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
                          {m?.department?.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Assign as Faculty">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => {
                              handleModal(m.id, "approve");
                            }}
                          >
                            <BadgeTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        {/* <IconButton size="small" color="success">
                        <PersonOffTwoToneIcon />
                      </IconButton> */}
                        {/* <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => {
                            dispatch(
                              setDialog({ type: "delete", payload: true })
                            );

                            setId(m.id);
                          }}
                        >
                          <DeleteTwoToneIcon />
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

export default FacullyInChargeTable;
