import React from "react";
import UserTable from "../../components/UserTable";
import { useFetch } from "../../../../hooks/useFetch";
import { createInfectedUser, getUsers } from "../../userThunks";
import store from "../../../../store/store";
import { useSelector } from "react-redux";
import Header from "../../../../components/header/Header";
import { Box, Container } from "@mui/material";
import ConfirmationDialog from "../../../../components/dialogs/ConfirmationDialog";
import useDialog from "../../../../hooks/useDialog";
import useForm from "../../../../hooks/useForm";
import ConfirmInfectedDialog from "../../components/Dialogs/ConfirmInfectedDialog";
import notify from "../../../../utils/toast";

function User() {
  const { data, loading } = useSelector((state) => state.user.getUser);
  const { loading: loadingInfected } = useSelector(
    (state) => state.user.createInfected
  );
  const { dialog, handleDialog } = useDialog({
    add: false,
  });
  const { state: form, handleChange } = useForm({ id: "", dateInfected: "" });

  const handleSubmit = async () => {
    const res = await store.dispatch(createInfectedUser(form));
    if (res) {
      handleDialog(false, "add");
      notify("Submitted as infected user");
    }
  };

  useFetch(() => store.dispatch(getUsers()));

  if (loading) {
    return <></>;
  }
  
  return (
    <Container>
      <Header title={"Users"} hideButton={true}></Header>

      <Box mb={4}></Box>

      <ConfirmInfectedDialog
        open={dialog.add}
        loading={loadingInfected}
        handleSubmit={handleSubmit}
        handleClose={() => {
          handleDialog(false, "add");
          handleChange("", "dateInfected");
        }}
        handleForm={(d) => handleChange(d, "dateInfected")}
      ></ConfirmInfectedDialog>

      <UserTable
        data={data}
        handleExposedUser={(id) => {
          handleDialog(true, "add");
          handleChange(id, "id");
        }}
      ></UserTable>
    </Container>
  );
}

export default User;
