import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  MenuList,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import ThumbUpOffAltTwoToneIcon from "@mui/icons-material/ThumbUpOffAltTwoTone";
import ThumbDownOffAltTwoToneIcon from "@mui/icons-material/ThumbDownOffAltTwoTone";
import moment from "../../utils/moment";
import store from "../../store/store";
import NoRecord from "../../layouts/no_records/Index";
import SkeletonLoading from "../../layouts/skeletons/Table";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import RemoveModal from "./modals/RemoveModal";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import {
  changeResearchStatus,
  deleteResearch,
  getResearches,
} from "../../store/actions/researchAction";
import { useParams } from "react-router-dom";
import PDFViewer from "../attachments/PDFViewer";
import LogsModal from "./modals/LogsModal";
import { useDispatch, useSelector } from "react-redux";
import { setDialog } from "../../store/reducers/researchReducer";

function ResearchApprovalTable({ data, loading, query }) {
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState(null);

  const { dialog } = useSelector((state) => state.research.view);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleStatus = (id, status) => {
    store.dispatch(changeResearchStatus(id, status, query));
  };

  const [id, setId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const handleDeleteModal = (status) => {
    setDeleteModal(status);
    if (!status) {
      console.log("dlee");
      store.dispatch(
        getResearches({
          status: "request_delete",
          search: "",
          year: "",
          month: "",
        })
      );
    }
  };
  const handleUpdateModal = (status) => {
    setUpdateModal(status);

    if (!status) {
      console.log("upod");
      store.dispatch(
        getResearches({
          status: "delete",
          search: "",
          year: "",
          month: "",
        })
      );
    }
  };

  const [showButton, setShowButton] = useState(null);
  const handleShow = (selected) => {
    if (selected == null) {
      setShowButton(null);
      return;
    }
    setShowButton(selected);
  };

  if (loading && !data?.length) {
    return <SkeletonLoading />;
  }
  return (
    <>
      {deleteModal && (
        <RemoveModal
          id={id}
          deleteModal={deleteModal}
          handleDeleteModal={handleDeleteModal}
          status={true}
        ></RemoveModal>
      )}
      {updateModal && (
        <RemoveModal
          id={id}
          deleteModal={updateModal}
          handleDeleteModal={handleUpdateModal}
          status={false}
        ></RemoveModal>
      )}
      {dialog == true && <LogsModal params={formData}></LogsModal>}

      <>
        <Box sx={{ overflow: "auto", mt: 2, boxShadow: 4, bgcolor: "white" }}>
          <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ bgcolor: "primary.light" }}>
                  <TableRow>
                    <TableCell>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          letterSpacing: 1.5,
                          fontSize: 12,
                          color: "text.secondary",
                        }}
                      >
                        ID
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          letterSpacing: 1.5,
                          fontSize: 12,
                          color: "text.secondary",
                        }}
                      >
                        Title
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          letterSpacing: 1.5,
                          fontSize: 12,
                          color: "text.secondary",
                        }}
                      >
                        Abstract
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          letterSpacing: 1.5,
                          fontSize: 12,
                          color: "text.secondary",
                        }}
                      >
                        Uploaded At
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          letterSpacing: 1.5,
                          fontSize: 12,
                          color: "text.secondary",
                        }}
                      >
                        Assign Status
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          letterSpacing: 1.5,
                          fontSize: 12,
                          color: "text.secondary",
                        }}
                      >
                        Actions
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((m, i) => (
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            letterSpacing: 1.5,
                            fontSize: 12,
                            wordWrap: "break-word",
                            // color: "text.secondary",
                          }}
                        >
                          {m.keyIdentifier}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            letterSpacing: 1.5,
                            fontSize: 12,
                            fontWeight: "bold",
                            textTransform: "capitalize",
                            lineSpacing: 1.5,
                          }}
                        >
                          {m.title}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 120 }}>
                        <Typography
                          sx={{
                            letterSpacing: 1.5,
                            fontSize: 12,
                            whiteSpace: showButton == i ? "normal" : "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            wordBreak: "break-all",
                          }}
                        >
                          {m.abstract}
                        </Typography>

                        {m.abstract.length >= 50 && showButton != i && (
                          <Button
                            sx={{
                              fontSize: 12,
                              textTransform: "lowercase",
                              pl: 0,
                            }}
                            onClick={() => handleShow(i)}
                          >
                            Read more
                          </Button>
                        )}
                        {m.abstract.length >= 50 && showButton == i && (
                          <Button
                            sx={{
                              fontSize: 12,
                              textTransform: "lowercase",
                              pl: 0,
                            }}
                            onClick={() => handleShow(null)}
                          >
                            read less
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ letterSpacing: 1.5, fontSize: 12 }}>
                          {moment(m.createdAt)}
                        </Typography>
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
                            value={m.status}
                            // label="Status"
                            fullWidth
                            sx={{ bgcolor: "primary.light" }}
                            onChange={(e) => {
                              handleStatus(m.id, e.target.value);
                            }}
                          >
                            <MenuItem value={"processing"}>Processing</MenuItem>
                            <MenuItem value={"request_delete"}>
                              Request Deletion
                            </MenuItem>
                            <MenuItem value={"published"}>Published</MenuItem>
                            <MenuItem value={"unpublished"}>
                              Unpublished
                            </MenuItem>
                            <MenuItem value={"denied"}>Decline</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => {
                            store.dispatch(
                              setDialog({ payload: true, type: "view" })
                            );
                            setFormData(m);
                          }}
                        >
                          <DescriptionIcon fontSize="small" />
                        </IconButton>
                        {m.status == "request_delete" && m.delete == false && (
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => {
                              setId(m.id);
                              setDeleteModal(true);
                            }}
                          >
                            <DeleteTwoToneIcon fontSize="small" />
                          </IconButton>
                        )}
                        {m.status == "request_delete" && m.delete && (
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => {
                              setId(m.id);
                              setUpdateModal(true);
                            }}
                          >
                            <RestartAltIcon fontSize="small" />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </>
    </>
  );
}

export default ResearchApprovalTable;
