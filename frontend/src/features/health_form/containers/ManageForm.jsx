import React from "react";
import FormTable from "../components/FormTable";
import { useFetch } from "../../../hooks/useFetch";
import store from "../../../store/store";
import {
  createQuestion,
  deleteQuestion,
  getQuestions,
  updateQuestion,
} from "../healthThunks";
import { useSelector } from "react-redux";
import useForm from "../../../hooks/useForm";
import useDialog from "../../../hooks/useDialog";
import ConfirmationDialog from "../../../components/dialogs/ConfirmationDialog";
import FormDialog from "../components/Dialogs/FormDialog";
import Header from "../../../components/header/Header";
import { Box, Container } from "@mui/material";
import toast from "../../../utils/toast";

function ManageForm() {
  const { data, loading, error } = useSelector(
    (state) => state.healthForm.getQuestions
  );
  const {
    createQuestion: post,
    updateQuestion: put,
    deleteQuestion: remove,
  } = useSelector((state) => state.healthForm);

  const { dialog, handleDialog } = useDialog({
    create: false,
    update: false,
    delete: false,
  });

  const {
    state: form,
    handleChange: handleForm,
    handleAll,
  } = useForm({
    title: "",
    subtitle: "",
  });

  const handleSubmit = async (mode) => {
    let res;
    switch (mode) {
      case "post":
        res = await store.dispatch(createQuestion(form));
        if (res) {
          handleDialog(false, "create");
          toast("Form Created");
        }
        break;
      case "update":
        res = await store.dispatch(updateQuestion(form));
        if (res) {
          handleDialog(false, "update");
          toast("Form Updated");
        }
        break;
      case "delete":
        res = await store.dispatch(deleteQuestion(form));
        if (res) {
          handleDialog(false, "delete");
          toast("Form Deleted", "error");
        }
        break;
      default:
        break;
    }
  };

  useFetch(() => store.dispatch(getQuestions()));

  if (loading) {
    return <></>;
  }
  
  return (
    <Container>
      <Header
        title={"Manage Form"}
        addTitleButton={"Question"}
        addHandleClick={() => handleDialog(true, "create")}
      ></Header>
      <Box mb={4}></Box>

      <FormDialog
        error={post.error}
        titleButton={"Create"}
        title={"Create"}
        data={form}
        loading={post.loading}
        open={dialog.create}
        handleForm={handleForm}
        handleClose={() => handleDialog(false, "create")}
        handleSubmit={() => handleSubmit("post")}
      ></FormDialog>

      <FormDialog
        error={put.error}
        loading={put.loading}
        titleButton={"Update"}
        title={"Update"}
        data={form}
        open={dialog.update}
        handleForm={handleForm}
        handleClose={() => handleDialog(false, "update")}
        handleSubmit={() => handleSubmit("update")}
      ></FormDialog>

      <ConfirmationDialog
        open={dialog.delete}
        loading={remove.loading}
        title={"Delete Question"}
        content={"Are you sure to delete this question?"}
        handleClose={() => handleDialog(false, "delete")}
        handleSubmit={() => handleSubmit("delete")}
      ></ConfirmationDialog>
      <FormTable
        data={data}
        handleUpdate={(data) => {
          handleDialog(true, "update");
          handleAll(data);
        }}
        handleDelete={(data) => {
          handleDialog(true, "delete");
          handleAll(data);
        }}
      ></FormTable>
    </Container>
  );
}

export default ManageForm;
