import React from "react";
import Header from "../../../components/header/Header";
import { Box, Container, Paper } from "@mui/material";
import ContactTable from "../components/monitor_contacts/ContactTable";
import { useSelector } from "react-redux";
import { useFetch } from "../../../hooks/useFetch";
import store from "../../../store/store";
import {
  getInfectedUsers,
  removeInfectedUsers,
  updateStatusInfected,
} from "../contactThunks";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../../../components/dialogs/ConfirmationDialog";
import useDialog from "../../../hooks/useDialog";
import useForm from "../../../hooks/useForm";
import UpdateStatusDIalog from "../components/dialogs/UpdateStatusDIalog";
import notify from "../../../utils/toast";
import SearchFilter from "../components/search/SearchFilter";

function MonitorContacts() {
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state.contact.infectedUsers);
  const { removeInfected, editInfected } = useSelector(
    (state) => state.contact
  );

  const {
    state: form,
    handleChange,
    handleAll,
  } = useForm({
    id: "",
    status: "",
  });

  const { dialog, handleDialog } = useDialog({
    edit: false,
    remove: false,
  });

  const { state: filterForm, handleChange: handleForm } = useForm({
    textField: "",
    select: "",
  });

  const handleRemove = async () => {
    const res = await store.dispatch(removeInfectedUsers(form));
    if (res) {
      handleDialog(false, "remove");
      notify("Infected User Deleted", "error");
    }
  };

  const handleUpdateStatus = async () => {
    const res = await store.dispatch(updateStatusInfected(form));
    if (res) {
      handleDialog(false, "edit");
      notify("Infected User  Status Updated");
    }
  };

  useFetch(() => store.dispatch(getInfectedUsers()));

  return (
    <Box>
      <Header
        title="Monitor Contacts"
        subTitle={"monitor and identify infected user's  close contacts."}
        addTitleButton={"Infected User"}
        addHandleClick={() => navigate("/clinic/users")}
      ></Header>

      <Box mb={4}></Box>

      <UpdateStatusDIalog
        open={dialog.edit}
        value={form.status}
        loading={editInfected.loading}
        handleClose={() => handleDialog(false, "edit")}
        handleValue={(val) => handleChange(val, "status")}
        handleSubmit={handleUpdateStatus}
      ></UpdateStatusDIalog>

      <ConfirmationDialog
        handleSubmit={handleRemove}
        loading={removeInfected.loading}
        open={dialog.remove}
        handleClose={() => handleDialog(false, "remove")}
        title={"Delete Infected User"}
        content={
          "Deleting this infected user the contact user's will also be deleted. "
        }
      ></ConfirmationDialog>

      <Paper sx={{ px: 1, py: 1, mb: 2 }}>
        <SearchFilter
          textField={{
            value: filterForm.textField,
            onChange: (e) => handleForm(e.target.value, "textField"),
          }}
          selectField={{
            value: filterForm.select,
            onChange: (e) => handleForm(e.target.value, "select"),
          }}
          loading={loading}
          onFilter={() =>
            store.dispatch(
              getInfectedUsers(filterForm.select, filterForm.textField)
            )
          }
        ></SearchFilter>
      </Paper>

      {!loading && (
        <ContactTable
          data={data}
          handleUpdateStatus={(data) => {
            console.log(data);
            handleDialog(true, "edit");
            handleAll(data);
          }}
          handleRemove={(userId) => {
            handleChange(userId, "id");
            handleDialog(true, "remove");
          }}
          handleTrace={(userId) => navigate(`${userId}/trace-contacts`)}
          handleView={(userId) => navigate(`/clinic/profile/${userId}`)}
          checkContacts={(userId) => navigate(`${userId}/check-contacts`)}
        ></ContactTable>
      )}
    </Box>
  );
}

export default MonitorContacts;
