import axios from "../../utils/axios";

import { SET_DATA, SET_ERROR, SET_LOADING } from "./healthSlice";

export const getHealthRecords =
  (date = "") =>
  async (dispatch) => {
    dispatch(SET_LOADING({ type: "getRecords", payload: true }));
    dispatch(SET_ERROR({ type: "getRecords", payload: false }));

    try {
      const { data } = await axios.get(`responses?date=${date}`);
      console.log(data);
      dispatch(SET_DATA({ type: "getRecords", payload: data }));
      dispatch(SET_LOADING({ type: "getRecords", payload: false }));
    } catch (error) {
      dispatch(SET_LOADING({ type: "getRecords", payload: false }));
      dispatch(SET_ERROR({ type: "getRecords", payload: true }));
    }
  };

export const getQuestions = () => async (dispatch) => {
  dispatch(SET_LOADING({ type: "getQuestions", payload: true }));
  dispatch(SET_ERROR({ type: "getQuestions", payload: false }));

  try {
    const { data } = await axios.get("questions");
    console.log(data);
    dispatch(SET_DATA({ type: "getQuestions", payload: data }));
    dispatch(SET_LOADING({ type: "getQuestions", payload: false }));
  } catch (error) {
    dispatch(SET_LOADING({ type: "getQuestions", payload: false }));
    dispatch(SET_ERROR({ type: "getQuestions", payload: true }));
  }
};

export const createQuestion = (form) => async (dispatch) => {
  dispatch(SET_LOADING({ type: "createQuestion", payload: true }));
  dispatch(SET_ERROR({ type: "createQuestion", payload: false }));

  try {
    const { data } = await axios.post("questions", form);
    console.log(data);
    dispatch(SET_DATA({ type: "createQuestion", payload: data }));
    dispatch(SET_LOADING({ type: "createQuestion", payload: false }));
    await dispatch(getQuestions());

    return true;
  } catch (error) {
    dispatch(SET_LOADING({ type: "createQuestion", payload: false }));
    dispatch(
      SET_ERROR({
        type: "createQuestion",
        payload: error.response.data.details,
      })
    );
    return false;
  }
};

export const deleteQuestion = (form) => async (dispatch) => {
  dispatch(SET_LOADING({ type: "deleteQuestion", payload: true }));
  dispatch(SET_ERROR({ type: "deleteQuestion", payload: false }));

  try {
    const { data } = await axios.delete(`questions/${form.id}`);
    dispatch(SET_DATA({ type: "deleteQuestion", payload: data }));
    dispatch(SET_LOADING({ type: "deleteQuestion", payload: false }));
    await dispatch(getQuestions());
    return true;
  } catch (error) {
    dispatch(SET_LOADING({ type: "deleteQuestion", payload: false }));
    dispatch(SET_ERROR({ type: "deleteQuestion", payload: true }));
    return false;
  }
};

export const updateQuestion = (form) => async (dispatch) => {
  dispatch(SET_LOADING({ type: "updateQuestion", payload: true }));
  dispatch(SET_ERROR({ type: "updateQuestion", payload: false }));

  try {
    const { data } = await axios.put(`questions/${form.id}`, form);
    dispatch(SET_DATA({ type: "updateQuestion", payload: data }));
    dispatch(SET_LOADING({ type: "updateQuestion", payload: false }));
    await dispatch(getQuestions());
    return true;
  } catch (error) {
    dispatch(SET_LOADING({ type: "updateQuestion", payload: false }));
    dispatch(
      SET_ERROR({
        type: "updateQuestion",
        payload: error.response.data.details,
      })
    );
    return false;
  }
};

export const getUserResponse = (id, hasForm) => async (dispatch) => {
  dispatch(SET_LOADING({ type: "userResponse", payload: true }));
  dispatch(SET_ERROR({ type: "userResponse", payload: false }));

  try {
    const { data } = await axios.get(
      `/users/${id}/responses?hasForm=${hasForm}`
    );
    dispatch(SET_DATA({ type: "userResponse", payload: data }));
    dispatch(SET_LOADING({ type: "userResponse", payload: false }));
    await dispatch(getQuestions());
  } catch (error) {
    dispatch(SET_LOADING({ type: "userResponse", payload: false }));
    dispatch(SET_ERROR({ type: "userResponse", payload: true }));
  }
};

export const submitForm = (id, form) => async (dispatch) => {
  dispatch(SET_LOADING({ type: "formSubmit", payload: true }));
  dispatch(SET_ERROR({ type: "formSubmit", payload: false }));

  try {
    const { data } = await axios.post(`/users/${id}/responses`, form);
    dispatch(SET_LOADING({ type: "formSubmit", payload: false }));
    await dispatch(getUserResponse(id, true));
  } catch (error) {
    dispatch(SET_LOADING({ type: "formSubmit", payload: false }));
    dispatch(SET_ERROR({ type: "formSubmit", payload: true }));
  }
};
