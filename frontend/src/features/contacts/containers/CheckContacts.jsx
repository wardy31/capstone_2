import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import store from "../../../store/store";
import { getInfectedUsersById, updateStatusContacts } from "../contactThunks";
import { useSelector } from "react-redux";
import InfectedUserContactsTable from "../components/table/InfectedUserContactsTable";
import Header from "../../../components/header/Header";
import { Box, Button, IconButton } from "@mui/material";
import UpdateStatusDIalog from "../components/dialogs/UpdateStatusDIalog";
import useDialog from "../../../hooks/useDialog";
import useForm from "../../../hooks/useForm";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";

function CheckContacts() {
  const { infectedUserById, editContacts } = useSelector(
    (state) => state.contact
  );
  const { id } = useParams();
  const navigate = useNavigate();

  const { dialog, handleDialog } = useDialog({
    update: false,
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
    await store.dispatch(updateStatusContacts(form, id));
  };

  useFetch(() => store.dispatch(getInfectedUsersById(id)));
  return (
    <>
      <Box display={"flex"} alignItems={"stretch"} columnGap={2} mt={2}>
        <Header
          title={"Check Contacts"}
          subTitle={"close contacts of the infected user."}
          hideButton={true}
          isBackButton={true}
          handleBackButton={() => navigate(-1)}
        ></Header>
      </Box>
      <Box mb={4}></Box>

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
