import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import store from "../../../store/store";
import {
  deleteContactUsers,
  getInfectedUsersById,
  updateStatusContacts,
} from "../contactThunks";
import { useSelector } from "react-redux";
import InfectedUserContactsTable from "../components/table/InfectedUserContactsTable";
import Header from "../../../components/header/Header";
import { Box, Button, IconButton } from "@mui/material";
import UpdateStatusDIalog from "../components/dialogs/UpdateStatusDIalog";
import useDialog from "../../../hooks/useDialog";
import useForm from "../../../hooks/useForm";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import notify from "../../../utils/toast";
import ConfirmationDialog from "../../../components/dialogs/ConfirmationDialog";

function CheckContacts() {
  const {
    infectedUserById,
    editContacts,
    deleteContactUser: removeContactUser,
  } = useSelector((state) => state.contact);
  const { id } = useParams();
  const navigate = useNavigate();

  const { dialog, handleDialog } = useDialog({
    update: false,
    remove: false,
  });

  const {
    state: form,
    handleChange,
    handleAll,
  } = useForm({
    id: "",
    status: "",
  });

  const updateContactById = async () => {
    const res = await store.dispatch(updateStatusContacts(form, id));
    if (res) {
      handleDialog(false, "update");
      notify("Contact user status updated");
    }
  };

  const deleteContactById = async () => {
    const res = await store.dispatch(deleteContactUsers(form, id));
    if (res) {
      handleDialog(false, "remove");
      notify("Contact user deleted", "error");
    }
  };

  useFetch(() => store.dispatch(getInfectedUsersById(id)));

  if (infectedUserById.loading) {
    return <></>;
  }
  return (
    <>
      <Box display={"flex"} alignItems={"stretch"} columnGap={2} mt={2}>
        <Header
          title={"Check Contacts"}
          subTitle={"close contacts."}
          hideButton={true}
          isBackButton={true}
          handleBackButton={() => navigate(-1)}
        ></Header>
      </Box>
      <Box mb={4}></Box>

      <ConfirmationDialog
        title={"Remove Contact User"}
        open={dialog.remove}
        handleClose={() => handleDialog(false, "remove")}
        loading={removeContactUser.loading}
        handleSubmit={deleteContactById}
        content={"Are you sure to remove this contact user?"}
      ></ConfirmationDialog>

      <UpdateStatusDIalog
        open={dialog.update}
        handleClose={() => handleDialog(false, "update")}
        isContact={true}
        value={form.status}
        loading={editContacts.loading}
        handleSubmit={updateContactById}
        handleValue={(value) => handleChange(value, "status")}
      ></UpdateStatusDIalog>

      <InfectedUserContactsTable
        data={infectedUserById.data?.ExposedUser}
        handleDelete={(val) => {
          handleAll(val);
          handleDialog(true, "remove");
        }}
        handleStatus={(val) => {
          handleDialog(true, "update");
          handleAll(val);
        }}
        handleView={(userId) => navigate(`/clinic/profile/${userId}`)}
      ></InfectedUserContactsTable>
    </>
  );
}

export default CheckContacts;
