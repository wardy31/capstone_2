import React from "react";
import Header from "../../../components/header/Header";
import { Box, Container } from "@mui/material";
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

  const handleRemove = async () => {
    await store.dispatch(removeInfectedUsers(form));
  };

  const handleUpdateStatus = async () => {
    await store.dispatch(updateStatusInfected(form));
  };

  useFetch(() => store.dispatch(getInfectedUsers()));
  return (
    <Container>
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
      ></ContactTable>
    </Container>
  );
}

export default MonitorContacts;
