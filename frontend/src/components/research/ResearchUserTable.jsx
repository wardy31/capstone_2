import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Pagination,
  Paper,
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
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import AutoDeleteTwoToneIcon from "@mui/icons-material/AutoDeleteTwoTone";
import PendingActionsTwoToneIcon from "@mui/icons-material/PendingActionsTwoTone";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import date from "../../utils/moment";
import AddModal from "./modal/AddModal";
import UpdateModal from "./modal/UpdateModal";
import DeleteModal from "./modal/DeleteModal";
import PendingModal from "./modal/PendingModal";
import DeleteRequestModal from "./modal/DeleteRequestModal";
import LogsModal from "./modal/LogsModal";
import { useDispatch } from "react-redux";
import { setDialog } from "../../store/reducers/researchReducer";
import NoRecord from "../../layouts/no_records/Index";
import SkeletonLoading from "../../layouts/skeletons/Table";
import UpdateIcon from "@mui/icons-material/Update";
import moment from "moment";
import ProcessModal from "./modal/ProcessModal";
import PDFViewer from "../attachments/PDFViewer";
import store from "../../store/store";
import { bulkUpload } from "../../store/actions/researchAction";

function ResearchUserTable({ data, loading, error }) {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [form, setForm] = useState();
  const [modalPDF, setModalPDF] = useState(false);
  const [show, setShow] = useState(null);

  const handleModal = (status) => {
    setModalPDF(status);
  };

  const handleClose = () => {
    setForm(null);
  };

  const shortenAbstract = (text) => {
    if (text.length >= 50) return text.slice(0, 50);
    return text;
  };

  const handleShowMore = (selected) => {
    if (selected == null) {
      setShow(null);
      return;
    }
    setShow(selected);
  };

  if (loading && !data?.length) {
    return (
      <>
        <SkeletonLoading />
      </>
    );
  }

  return (
    <>
      {modalPDF && (
        <PDFViewer
          modal={modalPDF}
          handleModal={handleModal}
          form={form}
        ></PDFViewer>
      )}
      <ProcessModal id={id} />
      <PendingModal id={id} />
      <LogsModal params={form} />
      {form && <UpdateModal id={id} params={form} handleClose={handleClose} />}
      <DeleteModal id={id} />
      <DeleteRequestModal id={id} />
      {data.length ? (
        <>
          <Box sx={{ overflow: "auto", borderRadius: 2, boxShadow: 2 }}>
            <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
              <TableContainer component={Paper} elevation={4}>
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
                          Research Date
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
                      {/* <TableCell>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        letterSpacing: 1.5,
                        fontSize: 12,
                      }}
                    >
                      Modified At
                    </Typography>
                  </TableCell> */}
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            letterSpacing: 1.5,
                            fontSize: 12,
                            color: "text.secondary",
                          }}
                        >
                          Status
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            letterSpacing: 1.5,
                            fontSize: 12,
                          }}
                        >
                          Actions
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((m, i) => (
                      <TableRow key={m.id}>
                        <TableCell>
                          <Typography
                            sx={{
                              letterSpacing: 1.5,
                              fontSize: 12,
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
                              color: "text.primary",
                            }}
                          >
                            {m.title}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            maxWidth: 180,
                          }}
                        >
                          <Typography
                            sx={{
                              textAlign: "left",
                              letterSpacing: 1.5,
                              fontSize: 12,
                              whiteSpace: show == i ? "normal" : "nowrap",
                              wordBreak: "break-all",
                              overflow: show == i ? null : "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {show == i
                              ? m.abstract
                              : shortenAbstract(m.abstract)}
                          </Typography>
                          {m.abstract.length >= 50 && show != i && (
                            <Button
                              onClick={() => handleShowMore(i)}
                              sx={{
                                textTransform: "lowercase",
                                fontSize: 12,
                                pl: 0,
                                ":hover": {
                                  bgcolor: "transparent",
                                },
                              }}
                            >
                              read more
                            </Button>
                          )}
                          {show == i && (
                            <Button
                              onClick={() => handleShowMore(null)}
                              sx={{
                                textTransform: "lowercase",
                                fontSize: 12,
                                pl: 0,
                                ":hover": {
                                  bgcolor: "transparent",
                                },
                              }}
                            >
                              read less
                            </Button>
                          )}
                        </TableCell>
                        <TableCell
                        // sx={{
                        //   maxWidth: {
                        //     xs: "auto",
                        //     md: "auto",
                        //     lg: 160,
                        //   },
                        // }}
                        >
                          <Typography
                            sx={{
                              letterSpacing: 1.5,
                              fontSize: 12,
                              wordWrap: ["break-word"],
                            }}
                          >
                            {moment(`${m.month}-1-${m.year}`).format(
                              `MMMM YYYY`
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography sx={{ letterSpacing: 1.5, fontSize: 12 }}>
                            {date(m.createdAt)}
                          </Typography>
                        </TableCell>
                        {/* <TableCell>
                      <Typography sx={{ letterSpacing: 1.5, fontSize: 12 }}>
                        {date(m.modifiedAt)}
                      </Typography>
                    </TableCell> */}
                        <TableCell>
                          {/* <Chip
                        label={
                          m.status == "request_delete"
                            ? "Request Deletion"
                            : m.status
                        }
                        color={colorChange(m.status)}
                        size="small"
                        sx={{
                          letterSpacing: 1.5,
                          textTransform: "capitalize",
                        }}
                      ></Chip> */}
                          {m.status == "sync_pending" && (
                            <Chip
                              label={"Sync Pending"}
                              size="small"
                              sx={{
                                bgcolor: "text.primary",
                                color: "white",
                                letterSpacing: 1.5,
                                textTransform: "capitalize",
                              }}
                            ></Chip>
                          )}
                          {m.status == "processing" && (
                            <Chip
                              label={m.status}
                              color={"info"}
                              size="small"
                              sx={{
                                letterSpacing: 1.5,
                                textTransform: "capitalize",
                              }}
                            ></Chip>
                          )}
                          {m.status == "unpublished" && (
                            <Chip
                              label={m.status}
                              color={"info"}
                              size="small"
                              sx={{
                                letterSpacing: 1.5,
                                textTransform: "capitalize",
                              }}
                            ></Chip>
                          )}
                          {m.status == "request_delete" && (
                            <Chip
                              label={"request deletion"}
                              color={"error"}
                              size="small"
                              sx={{
                                color: "white",
                                letterSpacing: 1.5,
                                textTransform: "capitalize",
                              }}
                            ></Chip>
                          )}
                          {m.status == "published" && (
                            <Chip
                              label={m.status}
                              color={"success"}
                              size="small"
                              sx={{
                                color: "white",
                                letterSpacing: 1.5,
                                textTransform: "capitalize",
                              }}
                            ></Chip>
                          )}
                          {m.status == "denied" && (
                            <Chip
                              label={"Decline"}
                              color={"secondary"}
                              size="small"
                              sx={{
                                letterSpacing: 1.5,
                                textTransform: "capitalize",
                              }}
                            ></Chip>
                          )}
                        </TableCell>
                        <TableCell align="start" sx={{ width: 110 }}>
                          {navigator.onLine ? (
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => {
                                setForm(m);
                                dispatch(
                                  setDialog({ payload: true, type: "view" })
                                );
                              }}
                            >
                              <PendingActionsTwoToneIcon />
                            </IconButton>
                          ) : (
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => {
                                setForm(m);
                                setModalPDF(true);
                              }}
                            >
                              <PendingActionsTwoToneIcon />
                            </IconButton>
                          )}

                          {m.status != "published" &&
                            m.status != "request_delete" && (
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => {
                                  setId(m.id);
                                  setForm(m);
                                  dispatch(
                                    setDialog({ payload: true, type: "put" })
                                  );
                                }}
                              >
                                <EditTwoToneIcon />
                              </IconButton>
                            )}
                          {m.status == "published" && (
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => {
                                setId(m.id);
                                dispatch(
                                  setDialog({ payload: true, type: "status" })
                                );
                              }}
                            >
                              <AutoDeleteTwoToneIcon />
                            </IconButton>
                          )}

                          {(m.status == "pending" ||
                            m.status == "sync_pending") && (
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => {
                                setId(m.id);
                                dispatch(
                                  setDialog({ payload: true, type: "delete" })
                                );
                              }}
                            >
                              <DeleteTwoToneIcon />
                            </IconButton>
                          )}

                          {m.status == "request_delete" && (
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => {
                                setId(m.id);
                                dispatch(
                                  setDialog({ payload: true, type: "approve" })
                                );
                              }}
                            >
                              <RotateLeftIcon />
                            </IconButton>
                          )}

                          {m.status == "denied" && (
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => {
                                setId(m.id);
                                dispatch(
                                  setDialog({ payload: true, type: "process" })
                                );
                              }}
                            >
                              <UpdateIcon />
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
      ) : (
        <NoRecord />
      )}
    </>
  );
}

export default ResearchUserTable;
