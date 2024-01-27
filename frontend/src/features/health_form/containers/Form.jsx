import { Box, Button, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../../components/header/Header";
import { useSelector } from "react-redux";
import { useFetch } from "../../../hooks/useFetch";
import { getQuestions, getUserResponse, submitForm } from "../healthThunks";
import store from "../../../store/store";
import FormList from "../components/FormList";
import useForm from "../../../hooks/useForm";

function Form() {
  const { data: user } = useSelector((state) => state.auth.getUser);
  const { data, loading } = useSelector(
    (state) => state.healthForm.getQuestions
  );
  const { data: hasForm, loading: hasFormLoading } = useSelector(
    (state) => state.healthForm.userResponse
  );

  const { loading: formLoading } = useSelector(
    (state) => state.healthForm.formSubmit
  );

  const [form, setForm] = useState([]);
  console.log("form", user);

  const handleForm = (id, data) => {
    const spreadForm = [...form];
    const index = spreadForm.findIndex((i) => i.questionnaireId === id);

    if (index !== -1) {
      spreadForm[index] = { ...spreadForm[index], answer: data };
      setForm(spreadForm);
    } else {
      const newObj = { questionnaireId: id, answer: data };
      setForm([...spreadForm, newObj]);
    }
  };

  const handleSubmit = () => {
    store.dispatch(submitForm(user.id, { response: JSON.stringify(form) }));
  };

  useFetch(() => store.dispatch(getUserResponse(user.id, true)));
  useFetch(() => store.dispatch(getQuestions()));

  return (
    <Container>
      <Header
        title={"Declaration Form"}
        subTitle={"Fill up the form before entering the campus"}
        hideButton={true}
      ></Header>
      <Box mb={4}></Box>

      <FormList
        data={data}
        handleForm={handleForm}
        form={form}
        hasForm={hasForm}
        hasFormLoading={hasFormLoading}
        onSubmit={handleSubmit}
        submitLoading={formLoading}
      ></FormList>
    </Container>
  );
}

export default Form;
