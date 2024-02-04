import React, { useState } from "react";
import StationTable from "./components/StationTable";
import { useFetch } from "../../hooks/useFetch";
import store from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  createStation,
  deleteStation,
  getStation,
  updateStation,
} from "./stationThunk";
import Header from "../../components/header/Header";
import {
  Box,
  Button,
  Card,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import useForm from "../../hooks/useForm";
import useDialog from "../../hooks/useDialog";
import ConfirmationDialog from "../../components/dialogs/ConfirmationDialog";
import FormDialog from "./components/Dialogs/FormDialog";
import { useNavigate } from "react-router-dom";
import toast from "../../utils/toast";
import useData from "../../hooks/useData";
import { LoadingButton } from "@mui/lab";

function Station() {
  const navigate = useNavigate();

  const {
    getStation: get,
    create: post,
    update: put,
    delete: remove,
  } = useSelector((state) => state.station);

  const { dialog, handleDialog } = useDialog({
    create: false,
    update: false,
    delete: false,
  });

  const {
    state: form,
    handleChange: handleForm,
    handleAll,
  } = useForm({ name: "" });

  const { state: searchData, handleChange: handleSearch } = useData("wd");

  const handleDelete = async () => {
    const result = await store.dispatch(deleteStation(form.id));
    if (result) {
      handleDialog(false, "delete");
      toast("Station Deleted", "error");
    }
  };
  const handleCreate = async () => {
    const res = await store.dispatch(createStation(form));
    if (res) {
      handleDialog(false, "create");
      toast("Station Created");
    }
  };
  const handleUpdate = async () => {
    const res = await store.dispatch(updateStation(form));
    if (res) {
      handleDialog(false, "update");
      toast("Station Updated");
    }
  };

  const handleViewUser = (data) => navigate(`${data.id}/logs`);

  useFetch(() => store.dispatch(getStation()));

  return (
    <Container>
      <Header
        title={"Stations"}
        // subTitle={"This is subtitle"}
        addTitleButton={"Station"}
        addHandleClick={() => handleDialog(true, "create")}
      ></Header>

      <FormDialog
        loading={post.loading}
        error={post.error}
        title={"Create Station"}
        titleButton={"Create"}
        open={dialog.create}
        forms={form}
        handleForm={handleForm}
        handleClose={() => handleDialog(false, "create")}
        handleSubmit={handleCreate}
      ></FormDialog>

      <FormDialog
        loading={put.loading}
        error={put.error}
        title={"Update Station"}
        titleButton={"Update"}
        open={dialog.update}
        forms={form}
        handleForm={handleForm}
        handleClose={() => handleDialog(false, "update")}
        handleSubmit={handleUpdate}
      ></FormDialog>

      <ConfirmationDialog
        {...remove}
        open={dialog.delete}
        title={"Delete Station"}
        content={"Are you sure to delete the station?"}
        handleClose={() => handleDialog(false, "delete")}
        handleSubmit={handleDelete}
      ></ConfirmationDialog>

      <Paper>
        <Box display={"flex"} columnGap={2} mt={5} mb={2} py={1} px={1}>
          <TextField
            size="small"
            sx={{ bgcolor: "primary.light" }}
            fullWidth
            label="Search here"
            value={searchData}
            onChange={(e) => handleSearch(e.target.value)}
          ></TextField>
          <LoadingButton
            sx={{ bgcolor: "primary.light" }}
            loading={get.loading}
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => store.dispatch(getStation(searchData))}
          >
            Filter
          </LoadingButton>
        </Box>
      </Paper>

      <StationTable
        {...get}
        handleForm={(data) => handleAll(data)}
        handleDelete={() => handleDialog(true, "delete")}
        handleUpdate={() => handleDialog(true, "update")}
        handleViewUser={handleViewUser}
      ></StationTable>
    </Container>
  );
}

export default Station;
