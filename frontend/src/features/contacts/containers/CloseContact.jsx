import React, { useEffect } from "react";
import CloseContactTable from "../components/CloseContactTable";
import { useSelector } from "react-redux";
import { useFetch } from "../../../hooks/useFetch";
import { getUserById } from "../../user/userThunks";
import { useNavigate, useParams } from "react-router-dom";
import store from "../../../store/store";
import CloseContactProfile from "../components/CloseContactProfile";
import { Box, Container, Grid } from "@mui/material";
import FilterContacts from "../components/FilterContacts";
import {
  addContactUsers,
  getContactUsers,
  getInfectedUsersById,
} from "../contactThunks";
import useForm from "../../../hooks/useForm";
import ConfirmationDialog from "../../../components/dialogs/ConfirmationDialog";
import useDialog from "../../../hooks/useDialog";
import ListData from "../components/ListData";
import notify from "../../../utils/toast";

function CloseContact() {
  const navigate = useNavigate();
  const { infectedUserById, contactUsers, createContactUser, contactVisited } =
    useSelector((state) => state.contact);
  const { id } = useParams();

  const { state: form, handleChange } = useForm({
    positiveDate: "",
    windowDate: "",
    stationId: "",
  });

  const { state: formContact, handleChange: handleDataContacts } = useForm({
    id: "",
  });

  const { dialog, handleDialog } = useDialog({
    add: false,
  });

  const getfilterContact = async () => {
    await store.dispatch(getContactUsers(infectedUserById.data?.userId, form));
  };

  const submitCloseContact = async () => {
    const res = await store.dispatch(addContactUsers(id, formContact));

    if (res) {
      handleDialog(false, "add");
      notify("User added as close contact.");
    }
  };

  useEffect(() => {
    if (infectedUserById.data) {
      handleChange(infectedUserById?.data?.dateInfected, "positiveDate");
    }
  }, [infectedUserById.data]);

  useFetch(() => store.dispatch(getInfectedUsersById(id)));

  function filterDuplicateContact() {
    return contactUsers?.data?.filter(
      (f) => !infectedUserById?.data?.ExposedUser.some((s) => s.userId === f.id)
    );
  }

  if (infectedUserById.loading) {
    return <></>;
  }

  return (
    <Box>
      <Box mt={4} mb={4}>
        <CloseContactProfile {...infectedUserById}></CloseContactProfile>
      </Box>

      <ConfirmationDialog
        open={dialog.add}
        title={"Add Close Contact"}
        titleButton={"Add"}
        content={"Are you sure to add this user as close contact?"}
        isDelete={false}
        handleClose={() => handleDialog(false, "add")}
        handleSubmit={submitCloseContact}
        loading={createContactUser.loading}
      ></ConfirmationDialog>

      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Box sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}>
            <FilterContacts
              {...infectedUserById}
              form={form}
              handleChange={handleChange}
              handlleFilter={getfilterContact}
              loading={contactUsers.loading}
            ></FilterContacts>

            <CloseContactTable
              {...contactUsers}
              data={filterDuplicateContact()}
              handleAdd={(userId) => {
                handleDialog(true, "add");
                handleDataContacts(userId, "id");
              }}
              checkProfile={(userId) => navigate(`/clinic/profile/${userId}`)}
            ></CloseContactTable>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <ListData
            title={"Infected User Visited"}
            isContacts={false}
            data={contactVisited.data}
          ></ListData>
          <ListData
            title={"Close Contacts"}
            isContacts={true}
            data={infectedUserById?.data?.ExposedUser}
          ></ListData>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CloseContact;
